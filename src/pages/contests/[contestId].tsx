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
// import Navbar from "../../components/Navbar/Navbar";
import Link from "next/link";
import Image from "next/image";

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
  const { user, loading: authLoading } = useAuth();
  const pathName = usePathname();

  // State initialization with localStorage
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [userStartTime, setUserStartTime] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize state after auth check
  useEffect(() => {
    if (!authLoading && user && contestId) {
      // Load current index
      const savedIndex = localStorage.getItem(`currentIndex_${contestId}_${user.teckziteId}`);
      if (savedIndex) setCurrentIndex(JSON.parse(savedIndex));

      // Load user answers
      const savedAnswers = localStorage.getItem(`userAnswers_${contestId}_${user.teckziteId}`);
      if (savedAnswers) setUserAnswers(JSON.parse(savedAnswers));

      // Load start time
      const storageKey = `contestStartTime_${contestId}_${user.teckziteId}`;
      const savedStartTime = localStorage.getItem(storageKey);
      const contestStartTimeMs = new Date(contest.startTime).getTime();
      const currentTime = Date.now();

      if (savedStartTime) {
        const savedTime = parseInt(savedStartTime);
        setUserStartTime(Math.max(savedTime, contestStartTimeMs));
      } else {
        const startTime = Math.max(contestStartTimeMs, currentTime);
        localStorage.setItem(storageKey, startTime.toString());
        setUserStartTime(startTime);
      }

      setLoading(false);
    }
  }, [authLoading, user, contestId, contest?.startTime]);

  // Save states to localStorage
  useEffect(() => {
    if (user && contestId) {
      localStorage.setItem(`currentIndex_${contestId}_${user.teckziteId}`, JSON.stringify(currentIndex));
    }
  }, [currentIndex, user, contestId]);

  useEffect(() => {
    if (user && contestId) {
      localStorage.setItem(`userAnswers_${contestId}_${user.teckziteId}`, JSON.stringify(userAnswers));
    }
  }, [userAnswers, user, contestId]);

  // Authentication check
  useEffect(() => {
    if (!authLoading && !user) {
      localStorage.setItem("redirectPath", pathName || "/");
      router.push("/login");
    }
  }, [authLoading, user, pathName, router]);

  // Initialize problem data
  useEffect(() => {
    if (!contest || loading) return;
    const currentProblem = contest.problems[currentIndex];
    const problemSlug = currentProblem.slug;
    const languages = Object.keys(currentProblem.starterCode) as (keyof typeof currentProblem.starterCode)[];;

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
  }, [currentIndex, contest, userAnswers, loading]);

  // Submission handler
  const handleSubmit = useCallback(async () => {
    if (!user || loading) return;
    setLoading(true);

    const submission = {
      userId: user.teckziteId,
      contestId,
      timeTaken: userStartTime ? Date.now() - userStartTime : null,
      answers: Object.entries(userAnswers).reduce((acc, [slug, data]) => {
        acc[slug] = { [data.selectedLanguage]: data.code[data.selectedLanguage] };
        return acc;
      }, {} as Record<string, Record<string, string>>),
    };

    try {
      const authToken = localStorage.getItem('token');
      await axios.post(`${BACKEND_URL}/api/contest/submit`, submission, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Clear contest-specific storage
      if (user && contestId) {
        localStorage.removeItem(`currentIndex_${contestId}_${user.teckziteId}`);
        localStorage.removeItem(`userAnswers_${contestId}_${user.teckziteId}`);
        localStorage.removeItem(`contestStartTime_${contestId}_${user.teckziteId}`);
      }

      customizedToast({ type: "success", position: "top-center", message: "Contest submitted successfully!" });
      setShowConfetti(true);
      setTimeout(() => router.push("/contests"), 4000);
    } catch (error: unknown) {
      customizedToast({
        type: "error",
        position: "top-center",
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || "Error submitting contest"
          : "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  }, [contestId, router, user, userAnswers, userStartTime, loading]);

  // Timer and auto-submit logic
  useEffect(() => {
    if (!contest?.startTime || !contest?.duration || loading) return;

    const contestStartTime = userStartTime || new Date(contest.startTime).getTime();
    const contestDurationMs = parseInt(contest.duration) * 60 * 60 * 1000;
    const contestEndTime = contestStartTime + contestDurationMs;

    const updateCountdown = () => {
      const now = Date.now();
      const remainingTime = contestEndTime - now;

      if (remainingTime <= 0) {
        setTimeLeft("00:00:00");
        if (!hasSubmitted.current) {
          hasSubmitted.current = true;
          handleSubmit();
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
  }, [contest, handleSubmit, loading, userStartTime]);

  // Code change handlers
  const handleCodeChange = (newCode: string) => {
    const currentProblem = contest.problems[currentIndex];
    const problemSlug = currentProblem.slug;

    setUserAnswers(prev => ({
      ...prev,
      [problemSlug]: {
        ...prev[problemSlug],
        code: {
          ...prev[problemSlug]?.code,
          [prev[problemSlug]?.selectedLanguage]: newCode
        }
      }
    }));
  };

  const handleLanguageChange = (newLang: keyof typeof currentProblem.starterCode) => {
    const currentProblem = contest.problems[currentIndex];
    const problemSlug = currentProblem.slug;
    const starterCode = currentProblem.starterCode[newLang];

    setUserAnswers(prev => ({
      ...prev,
      [problemSlug]: {
        selectedLanguage: newLang,
        code: {
          ...prev[problemSlug]?.code,
          [newLang]: prev[problemSlug]?.code[newLang] || starterCode
        }
      }
    }));
  };

  // Navigation handlers
  const handleNext = () => currentIndex < contest.problems.length - 1 && setCurrentIndex(prev => prev + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex(prev => prev - 1);
  const handleToggleQuestion = (index: number) => {
    setCurrentIndex(index);
    setSidebarOpen(false);
  };

  if (authLoading || loading) {
    return (
      <div className="bg-dark-layer-2 h-screen flex items-center justify-center">
        <DotSpinner size="40px" color="#3b82f6" />
      </div>
    );
  }

  if (!contest) return <p>Loading...</p>;

  const currentProblem = contest.problems[currentIndex];
  const problemData = userAnswers[currentProblem.slug] || {
    code: {},
    selectedLanguage: Object.keys(currentProblem.starterCode)[0]
  };

  if (timeLeft === "00:00:00") {
    return (
      <div className="bg-dark-layer-2 h-screen flex items-center justify-center text-3xl md:text-5xl font-bold text-center px-4">
        Contest Submission Closed
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-dark-layer-2 pt-3">
    {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} {/* ✅ Confetti Animation */}
{/* <Navbar/> */}
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
    {user ? (
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center"
            >
              <Image
                src={
                  "https://cdn-icons-png.flaticon.com/512/16802/16802273.png"
                }
                alt="Profile picture"
                width={20}
                height={20}
                className="object-cover w-full h-full"
              />
            </Link>
          ) : (
            <Link href={"/login"}>
              {/* bg-gradient-to-b from-amber-300 to-amber-600 text-neutral-800 */}
              <Button
                className="login-btn tracking-tight font-bold text-md px-2 sm:px-4 rounded-3xl
                transition duration-300 ease-in-out"
                onClick={()=>localStorage.setItem("redirectPath",pathName)}
              >
                Login
              </Button>
            </Link>
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