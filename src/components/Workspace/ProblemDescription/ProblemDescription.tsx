import { ProblemType } from "@/utils/types/problem";
import React from "react";
import { AiFillLike, AiFillDislike, AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton"; // Assume these skeleton components exist
import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import { useAuth } from "@/hooks/useAuth";

interface ProblemDescriptionProps{
    problem:ProblemType;
    _solved:boolean;
    // loading:boolean;
}
const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
    problem,
    // loading,
    // solved,
    // liked,
    // disliked,
    // starred,
    // updating,
    // handleLike,
    // handleDislike,
    // handleStar,
  }) => {

    const {loading} = useAuth();
    // Difficulty styling
    const difficultyClass = problem?.difficulty
      ? {
          easy: "bg-green-500",
          medium: "bg-yellow-500",
          hard: "bg-red-500",
        }[problem.difficulty]
      : "";

    // Loading Skeleton
    const renderSkeleton = () => (
      <div className="mt-3 flex space-x-2">
        <RectangleSkeleton />
        <CircleSkeleton />
        <RectangleSkeleton />
        <RectangleSkeleton />
        <CircleSkeleton />
      </div>
    );

    // Render Examples
    const renderExamples = () => {
      if (!problem?.examples || problem.examples.length === 0) return null;
      return (
        <div className="mt-4">
          {problem.examples.map((example, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-white">Example {index + 1}: </p>
              <div className="example-card bg-dark-layer-2 rounded-md">
                <pre className="text-white">
                  <strong>Input: </strong> {example.inputText}
                  <br />
                  <strong>Output: </strong> {example.outputText}
                  {example.explanation && (
                    <>
                      <br />
                      <strong>Explanation: </strong> {example.explanation}
                    </>
                  )}
                </pre>
              </div>
            </div>
          ))}
        </div>
      );
    };

    // Render Constraints
    const renderConstraints = () => {
        if (!problem?.constraints || problem.constraints.length === 0) return null;
        return (
          <div className="my-8 pb-4">
            <div className="text-white text-sm font-medium mb-2">Constraints:</div>
            <ul className="text-white ml-5 list-disc space-y-2">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="leading-relaxed">
                  <span className="bg-[#ffffff1a] py-0.5 px-2 rounded-full">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      };


    return (
      <div className="bg-dark-layer-1">
        {/* Tab */}
        <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
          <div className="bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">
            Description
          </div>
        </div>

        <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
          <div className="px-5 w-full">
            {/* Problem Heading */}
            <div className="w-full">
              <div className="flex space-x-4">
                <div className="flex-1 mr-2 text-lg text-white font-medium">{problem?.title}</div>
              </div>

              {/* {!loading && problem && (
                <div className="flex items-center mt-3">
                  <div className={`${difficultyClass} inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize`}>
                    {problem.difficulty}
                  </div>

                  {solved && (
                    <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-500">
                      <BsCheck2Circle />
                    </div>
                  )}

                  <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-400" onClick={handleLike}>
                    {liked && !updating ? <AiFillLike className="text-blue-500" /> : <AiFillLike />}
                    {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                  </div>

                  <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-400" onClick={handleDislike}>
                    {disliked && !updating ? <AiFillDislike className="text-red-500" /> : <AiFillDislike />}
                    {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                  </div>

                  <div className="cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-gray-400" onClick={handleStar}>
                    {starred && !updating ? <AiFillStar className="text-yellow-500" /> : <TiStarOutline />}
                    {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                  </div>
                </div>
              )} */}

              {/* Loading State */}
              {loading && renderSkeleton()}

              {/* Problem Description */}
              <div className="text-white text-sm mt-4">
                <p>{problem?.description}</p>
              </div>

              {/* Examples */}
              {renderExamples()}

              {/* Constraints */}
              {renderConstraints()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProblemDescription;