import DotSpinner from "@/components/Loader/DotSpinner";
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Send } from "lucide-react";
type EditorFooterProps = {
	handleRun:()=>void;
	handleSubmit: () => void;
	loading:boolean;
};



const EditorFooter: React.FC<EditorFooterProps> = ({loading,handleRun, handleSubmit }) => {
	return (
		<div className='flex'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				{/* <div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					<button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
						Console
						<div className='ml-1 transform transition flex items-center'>
							<BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
						</div>
					</button>
				</div> */}
				<div className='ml-auto flex items-center space-x-4'>
				<Button
						className='px-3 py-1  text-sm font-bold items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-gradient-to-br from-amber-500 to-red-500 hover:opacity-80 rounded-lg'
						onClick={handleRun}
						disabled={loading}
					>
						{loading?<div className="text-white flex gap-x-1 items-center"><DotSpinner size="18px" color="white"/> Running...</div>:<div className="flex gap-x-1 items-center"><Play/>Run</div>}
					</Button>
					<Button
						className='px-3 py-1.5 font-bold items-center transition-all focus:outline-none inline-flex text-sm text-white bg-gradient-to-b from-green-400 to-green-800 hover:opacity-80 rounded-lg'
						onClick={handleSubmit}
						disabled={loading}
					>
						{/* {loading?<div className="text-white flex gap-x-1 items-center"><DotSpinner size="18px" color="white"/> Submitting...</div>:<div className="flex gap-x-1 items-center"><Send/>Submit</div>} */}
						<Send/>Submit
					</Button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;
