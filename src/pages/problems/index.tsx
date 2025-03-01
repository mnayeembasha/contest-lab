import { useState, useEffect } from "react";
import useHasMounted from "@/hooks/useHasMounted";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import Link from "next/link";
import { ProblemType } from "@/utils/types/problem";



export default function Home() {
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const { loading, setLoading } = useAuth();

  const hasMounted = useHasMounted();

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/questions`);
        setProblems(res.data);
      } catch (error) {
        console.log("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (loading) {
    return (
	<div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
	{[...Array(10)].map((_, idx) => (
	  <LoadingSkeleton key={idx} />
	))}
  </div>
    );
  }

  return (
    <div className="mt-10">
   <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
     {
       <>
         <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
           <tr>
             <th scope="col" className="px-1 py-3 w-0 font-medium">
               Status
             </th>
             <th scope="col" className="px-6 py-3 w-0 font-medium">
               Title
             </th>
             <th scope="col" className="px-6 py-3 w-0 font-medium">
               Difficulty
             </th>
             <th scope="col" className="px-6 py-3 w-0 font-medium">
               Category
             </th>
           </tr>
         </thead>
         <tbody className="text-gray-400 dark:text-gray-400 ">
           {!problems && (
             <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
               {[...Array(10)].map((_, idx) => (
                 <LoadingSkeleton key={idx} />
               ))}
             </div>
           )}
           {problems &&
             problems.map((problem, idx) => {
               const difficulyColor =
                 problem.difficulty === "easy"
                   ? "text-dark-green-s"
                   : problem.difficulty === "medium"
                   ? "text-dark-yellow"
                   : "text-dark-pink";
               return (
                 <tr
                   className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
                   key={problem._id}
                 >
                   <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                     {/* {solvedProblems.includes(problem.id) && (
                       <BsCheckCircle fontSize={"18"} width="18" />
                     )} */}
                   </th>
                   <td className="px-6 py-4">
                     {problem.slug ? (
                       <Link
                         href={`/problems/${problem.slug}`}
                         className="hover:text-blue-600 cursor-pointer"
                       >
                         {problem.title}
                       </Link>
                     ) : (
                       <Link
                         className="hover:text-blue-600 cursor-pointer"
                         href={`#`}
                       >
                         {problem.title}
                       </Link>
                     )}
                   </td>
                   <td className={`px-6 py-4 ${difficulyColor}`}>
                     {problem.difficulty}
                   </td>
                   <td className={"px-6 py-4"}>{problem.category}</td>
                 </tr>
               );
             })}
         </tbody>
       </>
     }
   </table>
 </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
