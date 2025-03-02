// import { useState } from "react";
// import { firestore } from "@/firebase/firebase"; // Ensure Firebase is configured
// import { collection, addDoc } from "firebase/firestore";
// import React from "react";
// const   AdminPage:React.FC = () => {
//   const [problem, setProblem] = useState({
//     id: "",
//     title: "",
//     difficulty: "Easy",
//     category: "",
//     order: 1,
//     videoId: "",
//     like: 0,
//     dislike: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e: { target: { name: string; value: string; }; }) => {
//     setProblem({
//       ...problem,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const problemsCollection = collection(firestore, "problems");
//       await addDoc(problemsCollection, problem);
//       setSuccessMessage("Problem added successfully!");
//       setProblem({
//         id: "",
//         title: "",
//         difficulty: "Easy",
//         category: "",
//         order: 1,
//         videoId: "",
//         like: 0,
//         dislike: 0,
//       });
//     } catch (error) {
//       console.error("Error adding problem: ", error);
//       setSuccessMessage("Failed to add problem.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-dark-layer-2 text-gray-200 p-6">
//       <h1 className="text-2xl font-medium mb-6">Admin: Add New Problem</h1>
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         {/* ID Field */}
//         <div>
//           <label htmlFor="id" className="block text-sm mb-2">
//             ID (Unique Identifier)
//           </label>
//           <input
//             type="text"
//             id="id"
//             name="id"
//             value={problem.id}
//             onChange={handleChange}
//             className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//             required
//           />
//         </div>

//         {/* Title Field */}
//         <div>
//           <label htmlFor="title" className="block text-sm mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={problem.title}
//             onChange={handleChange}
//             className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//             required
//           />
//         </div>

//         {/* Difficulty Dropdown */}
//         <div>
//           <label htmlFor="difficulty" className="block text-sm mb-2">
//             Difficulty
//           </label>
//           <select
//             id="difficulty"
//             name="difficulty"
//             value={problem.difficulty}
//             onChange={handleChange}
//             className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//           >
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </select>
//         </div>

//         {/* Category Field */}
//         <div>
//           <label htmlFor="category" className="block text-sm mb-2">
//             Category
//           </label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={problem.category}
//             onChange={handleChange}
//             className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//             required
//           />
//         </div>

//         {/* Order Field */}
//         <div>
//           <label htmlFor="order" className="block text-sm mb-2">
//             Order
//           </label>
//           <input
//             type="number"
//             id="order"
//             name="order"
//             value={problem.order}
//             onChange={handleChange}
//             className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//             required
//           />
//         </div>

//         {/* Video ID Field */}
//         <div>
//           <label htmlFor="videoId" className="block text-sm mb-2">
//             Video ID (YouTube)
//           </label>
//           <input
//             type="text"
//             id="videoId"
//             name="videoId"
//             value={problem.videoId}
//             onChange={handleChange}
//             className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//           />
//         </div>

//         {/* Like and Dislike Fields */}
//         <div className="flex space-x-4">
//           <div>
//             <label htmlFor="like" className="block text-sm mb-2">
//               Like
//             </label>
//             <input
//               type="number"
//               id="like"
//               name="like"
//               value={problem.like}
//               onChange={handleChange}
//               className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//             />
//           </div>
//           <div>
//             <label htmlFor="dislike" className="block text-sm mb-2">
//               Dislike
//             </label>
//             <input
//               type="number"
//               id="dislike"
//               name="dislike"
//               value={problem.dislike}
//               onChange={handleChange}
//               className="w-full p-2 bg-dark-layer-1 border border-gray-600 rounded"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Adding..." : "Add Problem"}
//         </button>
//       </form>

//       {successMessage && (
//         <p className="mt-4 text-green-400">{successMessage}</p>
//       )}
//     </div>
//   );
// }

// export default AdminPage;

export default function AdminPage(){
  return <div>Admin</div>
}
