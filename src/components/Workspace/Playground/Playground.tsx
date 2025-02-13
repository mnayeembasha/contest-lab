import { ProblemType } from "@/utils/types/problem";
import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import Split from "react-split";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";

type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

interface PlaygroundProps {
  problem: ProblemType;
  setSuccess: SetStateBoolean;
  setSolved: SetStateBoolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
  const languages = Object.keys(problem.starterCode || {});
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [userCode, setUserCode] = useState<string>(
    problem.starterCode[selectedLang as keyof typeof problem.starterCode] || ""
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);

  useEffect(() => {
    setUserCode(
      problem.starterCode[selectedLang as keyof typeof problem.starterCode]
    );
  }, [selectedLang, problem.starterCode]);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleRun = () => {
    console.log("Selected Language:", selectedLang);
    console.log("User Code:", userCode);
  };

  const handleSubmit=()=>{

  }

  return (
    <div className="flex flex-col h-full bg-dark-layer-1 relative overflow-x-hidden">
      <div className="flex items-center justify-between space-x-2 bg-dark-layer-2 h-11">
        <Select value={selectedLang} onValueChange={setSelectedLang}>
          <SelectTrigger className="bg-dark-fill-3 text-white py-1 px-3 rounded w-fit">
            <span className="capitalize mr-1">
              {selectedLang || "Select Language"}
            </span>
          </SelectTrigger>
          <SelectContent className="bg-dark-layer-1 text-white">
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang} className="capitalize px-3">
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex">
          <EditorFooter handleSubmit={handleSubmit} />

        <button
          onClick={handleFullScreen}
          className="text-white px-3 text-xl font-bold"
        >
          {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
        </button>
        </div>
      </div>

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        // sizes={[60, 40]}
        sizes={[60,40]}
        minSize={60}
      >
        <div className="h-[calc(100vh-94px)] w-full overflow-auto p-4">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={setUserCode}
            extensions={[javascript()]}
          />
        </div>

        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex flex-col w-full">
  <div className="flex mt-2 gap-2 w-full">
    {problem.examples &&
      problem.examples.map((example, index) => (
        <div
          key={example.id}
          className=""
          onClick={() => setActiveTestCaseId(index)}
        >
          <div
            className={`font-medium w-full text-center transition-all focus:outline-none bg-dark-fill-3 hover:bg-dark-fill-2 rounded-md px-3 py-1 cursor-pointer
              ${activeTestCaseId === index ? "text-white bg-dark-fill-2" : "text-gray-500"}
            `}
          >
            Case - {index + 1}
          </div>
        </div>
      ))}
  </div>

  <div className="font-semibold w-full mb-4">
    <p className="text-sm font-medium mt-4 text-white">Input:</p>
    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
      <pre>
        {problem.examples ? problem.examples[activeTestCaseId].inputText : ""}
      </pre>
    </div>
    <p className="text-sm font-medium mt-4 text-white">Expected Output:</p>
    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
      <pre>
        {problem.examples ? problem.examples[activeTestCaseId].outputText : ""}
      </pre>
    </div>
  </div>
</div>

        </div>
      </Split>
      {/* <EditorFooter handleSubmit={handleSubmit} /> */}
    </div>
  );
};

export default Playground;
