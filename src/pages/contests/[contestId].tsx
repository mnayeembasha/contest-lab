import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { mockContest } from "@/utils/data/contest";
import Workspace from "@/components/Workspace2/Workspace";
import { ChevronLeft, ChevronRight, Menu, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { customizedToast } from "@/utils/Toast/Toast";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

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
  const {user} = useAuth();
  const pathName = usePathname();
  useEffect(() => {
    if (!user) {
      customizedToast({
        type: "error",
        position: "top-center",
        message: "Login to continue to contest",
      });

      localStorage.setItem("redirectPath", pathName);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, []);


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
  }, [currentIndex, contest]);

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
          hasSubmitted.current = true; // ✅ Prevent multiple submissions
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
  }, [contest]);


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

  if (!contest) return <p>Loading...</p>;

  const currentProblem = contest.problems[currentIndex];
  const problemSlug = currentProblem.slug;
  const problemData = userAnswers[problemSlug] || {
    code: {},
    selectedLanguage: Object.keys(currentProblem.starterCode)[0]
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


  const handleSubmit = async () => {
    if (!user) {
      customizedToast({ type: "error", position: "top-center", message: "Cannot submit the contest" });
      return;
    }
    const submission = {
      userId: user.id,
      contestId,
      answers: Object.entries(userAnswers).reduce((acc, [slug, data]) => {
        acc[slug] = { [data.selectedLanguage]: data.code[data.selectedLanguage] };
        return acc;
      }, {} as Record<string, Record<string, string>>)
    };

    try {
      await axios.post(`${BACKEND_URL}/api/contest/submit`, submission, { withCredentials: true });
      customizedToast({ type: "success", position: "top-center", message: "Contest submitted successfully!" });
      setTimeout(()=>{
        router.push("/contests");
      },2000)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        customizedToast({ type: "error", position: "top-center", message: error.response?.data?.message || "Error submitting contest" });
        // router.push("/contests");
      } else {
        console.error("Unexpected error:", error);
        customizedToast({ type: "error", position: "top-center", message: "Something went wrong" });
        // router.push("/contests");
      }
    }
  };


  return (
    <div className="flex">
      {/* Sidebar Navigation (Toggle) */}
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
          <h1 className="text-3xl font-extrabold tracking-tighter select-none bg-gradient-to-b from-amber-300 to-red-500 bg-clip-text text-transparent">{contest.contestName}</h1>
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
              >
               <Send/> Submit
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




