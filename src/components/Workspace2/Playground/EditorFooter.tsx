import DotSpinner from "@/components/Loader/DotSpinner";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import React from "react";

type EditorFooterProps = {
	handleRun:()=>void;
	handleSubmit: () => void;
	loading:boolean;
};



const EditorFooter: React.FC<EditorFooterProps> = ({loading,handleRun }) => {
	return (
		<div className='flex'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				<div className='ml-auto flex items-center space-x-4'>
				<Button
						className='px-3 py-1  text-sm font-bold items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-gradient-to-br from-amber-500 to-red-500 hover:opacity-80 rounded-lg'
						onClick={handleRun}
						disabled={loading}
					>
						{loading?<div className="text-white flex gap-x-1 items-center"><DotSpinner size="18px" color="white"/> Running...</div>:<div className="flex gap-x-1 items-center"><Play/>Run</div>}
					</Button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;
