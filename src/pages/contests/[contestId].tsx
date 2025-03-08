'use client'
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import { mockContest } from "@/utils/data/contest";
import Workspace from "@/components/Workspace2/Workspace";
import { ChevronLeft, ChevronRight, Menu, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { customizedToast } from "@/utils/Toast/Toast";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import Confetti from "react-confetti";
import DotSpinner from "@/components/Loader/DotSpinner";
import Navbar from "../../components/Navbar/Navbar";

interface UserAnswers {
  [problemSlug: string]: {
    code: {
      [language: string]: string;
    };
    selectedLanguage: string;
  };
}

const ContestPage = () => {
  const router = useRouter();
  const hasSubmitted = useRef(false);
  const { contestId } = router.query;
  const contest = mockContest;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [loading,setLoading] = useState<boolean>(false);
  const {user} = useAuth();

  const [userStartTime, setUserStartTime] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNext = () => {
    if (currentIndex < contest.problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleToggleQuestion = (index: number) => {
    setCurrentIndex(index);
    setSidebarOpen(false);
  };

  const handleCodeChange = (newCode: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [problemSlug]: {
        ...prev[problemSlug],
        code: {
          ...prev[problemSlug]?.code,
          [problemData.selectedLanguage]: newCode
        }
      }
    }));
  };

  const handleLanguageChange = (newLang: keyof typeof currentProblem.starterCode) => {
    const currentProblem = contest.problems[currentIndex];
    const starterCode = currentProblem.starterCode[newLang];

    setUserAnswers(prev => ({
      ...prev,
      [problemSlug]: {
        ...prev[problemSlug],
        selectedLanguage: newLang,
        code: {
          ...prev[problemSlug]?.code,
          [newLang]: prev[problemSlug]?.code[newLang] || starterCode
        }
      }
    }));
  };

  const pathName = usePathname();
  useEffect(() => {
    if (!user) {
      // customizedToast({
      //   type: "error",
      //   position: "top-center",
      //   message: "Login to continue to contest",
      // });

      localStorage.setItem("redirectPath", pathName || "/");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [pathName,router,user]);


  useEffect(() => {
    if (!contest) return;
    const currentProblem = contest.problems[currentIndex];
    const problemSlug = currentProblem.slug;
    const languages = Object.keys(currentProblem.starterCode) as (keyof typeof currentProblem.starterCode)[];

    if (!userAnswers[problemSlug]) {
      const selectedLanguage = languages[0];
      const starterCode = currentProblem.starterCode[selectedLanguage];
      setUserAnswers(prev => ({
        ...prev,
        [problemSlug]: {
          code: { [selectedLanguage]: starterCode },
          selectedLanguage
        }
      }));
    }
  }, [currentIndex, contest,userAnswers]);

   // Initialize user's start time from localStorage or set it
   useEffect(() => {
    if (!user || !contestId || !contest?.startTime) return;

    const storageKey = `contestStartTime_${contestId}_${user.teckziteId}`;
    const savedStartTime = localStorage.getItem(storageKey);
    const contestStartTimeMs = new Date(contest.startTime).getTime();
    const currentTime = Date.now();

    if (savedStartTime) {
      const savedTime = parseInt(savedStartTime);
      // Ensure user's start time is not before contest start time
      if (savedTime < contestStartTimeMs) {
        localStorage.setItem(storageKey, contestStartTimeMs.toString());
        setUserStartTime(contestStartTimeMs);
      } else {
        setUserStartTime(savedTime);
      }
    } else {
      // User starts now; set start time to max(contest start time, current time)
      const startTime = Math.max(contestStartTimeMs, currentTime);
      localStorage.setItem(storageKey, startTime.toString());
      setUserStartTime(startTime);
    }
  }, [user, contestId, contest?.startTime]);

  const handleSubmit = useCallback( async () => {
    if (!user) {
      customizedToast({ type: "error", position: "top-center", message: "Cannot submit the contest" });
      return;
    }
    setLoading(true);
    const now = Date.now();
    const timeTakenValue = userStartTime ? now - userStartTime : null;
    setUserStartTime(timeTakenValue);

    const submission = {
      userId: user.teckziteId,
      contestId,
      timeTaken: timeTakenValue,
      answers: Object.entries(userAnswers).reduce((acc, [slug, data]) => {
        acc[slug] = { [data.selectedLanguage]: data.code[data.selectedLanguage] };
        return acc;
      }, {} as Record<string, Record<string, string>>),
    };
    const authToken =localStorage.getItem('token');
    try {
      await axios.post(`${BACKEND_URL}/api/contest/submit`, submission, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Replace authToken with your actual token variable
        },
      });
      customizedToast({ type: "success", position: "top-center", message: "Contest submitted successfully!" });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        router.push("/contests");
      }, 4000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        customizedToast({ type: "error", position: "top-center", message: error.response?.data?.message || "Error submitting contest" });
      } else {
        console.error("Unexpected error:", error);
        customizedToast({ type: "error", position: "top-center", message: "Something went wrong" });
      }
    }
    finally{
      setLoading(false);
    }
  },[contestId,router,user,userAnswers,userStartTime]);

  useEffect(() => {
    if (!contest?.startTime || !contest?.duration) return;

    const contestStartTime = new Date(contest.startTime).getTime();
    const contestDurationMs = parseInt(contest.duration) * 60 * 60 * 1000;
    const contestEndTime = contestStartTime + contestDurationMs;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const remainingTime = contestEndTime - now;

      if (remainingTime <= 0) {
        setTimeLeft("00:00:00");
        if (!hasSubmitted.current) {
          hasSubmitted.current = true;
          // handleSubmit();
        }
        return;
      }

      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [contest,handleSubmit]);



  if (!contest) return <p>Loading...</p>;

  const currentProblem = contest.problems[currentIndex];
  const problemSlug = currentProblem.slug;
  const problemData = userAnswers[problemSlug] || {
    code: {},
    selectedLanguage: Object.keys(currentProblem.starterCode)[0]
  };





  return (
    <div className="flex flex-col bg-dark-layer-2">
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} {/* ✅ Confetti Animation */}
      <Navbar/>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-dark-layer-2 p-4 overflow-y-auto transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  md:w-1/5`}
      >
        {/* Close Icon */}
        <button className="absolute top-4 right-4" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Questions</h2>
        <ul>
          {contest.problems.map((problem, index) => (
            <li
              key={problem._id}
              className={`p-2 cursor-pointer rounded-lg mb-2 transition duration-200 ${
                currentIndex === index
                  ? "bg-gradient-to-b from-amber-300 to-red-300 text-gray-900 font-semibold"
                  : "hover:bg-gradient-to-b hover:from-amber-300 hover:to-red-300 hover:text-gray-900 hover:font-semibold transition-all duration-300"
              }`}
              onClick={() => {
                handleToggleQuestion(index);
                setSidebarOpen(true);
              }}
            >
              {index + 1}. {problem.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-2 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          {/* Contest Title with Toggle Button */}
          <div className="flex items-center space-x-3">
            <button className="" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Problem List</h1>
          </div>
          <div>
          {/* <h1 className="text-3xl font-extrabold tracking-tighter select-none bg-gradient-to-b from-amber-300 to-red-500 bg-clip-text text-transparent">{contest.contestName}</h1> */}
          </div>
          {/* Navigation Buttons */}
          <div className="flex space-x-4">
          <div className="text-lg font-semibold bg-dark-layer-1 p-2 rounded-md">
            Time Left: <span className="text-red-500">{timeLeft}</span>
          </div>
            <Button
              className="px-4 py-2 bg-dark-layer-1 rounded disabled:opacity-50 hover:bg-dark-divider-border-2"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
             <ChevronLeft/> Prev
            </Button>

            {currentIndex < contest.problems.length - 1 ? (
              <Button
                className="px-4 py-2 bg-dark-layer-1 text-white rounded hover:bg-dark-divider-border-2"
                onClick={handleNext}
              >
                Next<ChevronRight/>
              </Button>
            ) : (
              <Button
               className='px-3 py-1.5 font-bold items-center transition-all focus:outline-none inline-flex text-sm text-white bg-gradient-to-b from-green-400 to-green-800 hover:opacity-80 rounded-lg'
                onClick={handleSubmit}
                disabled={loading}
              >
               {loading?<div className="text-white flex gap-x-1 items-center"><DotSpinner size="18px" color="white"/> Submitting...</div>:<div className="flex gap-x-1 items-center"><Send/>Submit</div>}
              </Button>
            )}
          </div>

        </div>

        {/* Workspace Component */}
        <Workspace
          problem={currentProblem}
          code={problemData.code[problemData.selectedLanguage] || ""}
          selectedLanguage={problemData.selectedLanguage}
          onCodeChange={handleCodeChange}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
};

export default ContestPage;




