import { useRouter } from "next/router";
import { useState } from "react";
import { mockContest } from "@/utils/data/contest";
import Workspace from "@/components/Workspace/Workspace";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContestPage = () => {
  const router = useRouter();
  const { contestId } = router.query;
  const contest = mockContest;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!contest) return <p>Loading...</p>;

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

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit the contest?")) {
      console.log("Contest Submitted", {
        contestId,
        userAnswers,
      });
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
                  ? "bg-amber-600 text-white"
                  : "hover:bg-amber-600"
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
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          {/* Contest Title with Toggle Button */}
          <div className="flex items-center space-x-3">
            <button className="" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold">{contest.contestName}</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <Button
              className="px-4 py-2 bg-dark-layer-1 rounded disabled:opacity-50 hover:bg-dark-divider-border-2"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            {currentIndex < contest.problems.length - 1 ? (
              <Button
                className="px-4 py-2 bg-dark-layer-1 text-white rounded hover:bg-dark-divider-border-2"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </div>
        </div>

        {/* Workspace Component */}
        <Workspace problem={contest.problems[currentIndex]} />
      </div>
    </div>
  );
};

export default ContestPage;
