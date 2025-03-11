// Playground.tsx
import { ProblemType } from "@/utils/types/problem";
import { useEffect, useRef, useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
// import CodeMirror from "@uiw/react-codemirror";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// import { javascript } from "@codemirror/lang-javascript";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import EditorFooter from "./EditorFooter";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { customizedToast } from "@/utils/Toast/Toast";

type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

interface PlaygroundProps {
  code: string;
  selectedLanguage: string;
  onCodeChange: (newCode: string) => void;
  onLanguageChange: (language: "python"|"java"|"c"|"c++"|"javascript") => void;
  problem: ProblemType;
  setSuccess: SetStateBoolean;
  setSolved: SetStateBoolean;
}
interface Results{
  input:string;
  expected:string;
  output:string;
}
interface SuccessStatus{
  message:string,
  results:Results[]
}
interface FailureStatus{
  error:string,
  testCase:Results
}

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  code,
  selectedLanguage,
  onCodeChange,
  onLanguageChange,
  // setSuccess,
  // setSolved
}) => {
  const languages = Object.keys(problem.starterCode || {});
  const [isFullScreen,setIsFullScreen] = useState(false);
  const [activeTestCaseId,setActiveTestCaseId] = useState<number>(0);
  const [loading,setLoading] = useState<boolean>(false);
  const [status,setStatus] = useState<(SuccessStatus&FailureStatus)|null>(null);
  const [token,setToken] = useState<string>("");
  const remainingAttempts = useRef<number>(8);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set it in state if needed
    }
  }, []);

  const handleRun = async () => {
    console.log("Selected Language:", selectedLanguage);
    console.log("User Code:", code);

    // const authToken = localStorage.getItem("token");
    console.log("Retrieved Token from localStorage:", token);

    if (!token) {
      console.error("⚠️ No token found in localStorage!");
      customizedToast({ type: "error", message: "Authentication token missing!" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/run`,
        {
          code: code,
          language: selectedLanguage,
          slug: problem.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Backend Response:", res.data);
      setStatus(res.data);
      remainingAttempts.current = res.data.remainingAttempts;
      customizedToast({ type: "success", message: res.data?.message });

      if (res.data?.error) {
        customizedToast({
          type: "error",
          position: "top-center",
          message: (
            <>
              {res.data?.error} <br /> Received Output: {res.data?.testCase?.output}
            </>
          ),
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data);
        customizedToast({
          type: "error",
          position: "top-center",
          message: error.response?.data?.message || "An unexpected error occurred",
        });
      } else {
        console.error("Unexpected Error:", error);
        customizedToast({
          type: "error",
          position: "top-center",
          message: "An unexpected error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  };


  const getStatusClass = () => {
    if (status?.message) return "text-[#27AE60] bg-dark-layer-2";
    if (status?.error) return "text-[#C0392B] bg-dark-layer-2";
    return "bg-dark-fill-3 text-white";
  };

  return (
    <div className="flex flex-col h-full bg-dark-layer-1 relative overflow-x-hidden">
      <div className="flex items-center justify-between space-x-2 bg-dark-layer-2 h-11">
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="bg-dark-fill-3 text-white py-1 px-3 rounded w-fit border-none">
            <span className="capitalize mr-1">
              {selectedLanguage || "Select Language"}
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
        <p className="flex items-center">
  Remaining Attempts :{"  "}
  <span className="pl-2 text-2xl font-bold">{remainingAttempts.current}</span>
</p>
          <EditorFooter handleRun={handleRun} handleSubmit={() => {}} loading={loading}/>
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
        sizes={[60,40]}
        minSize={60}
      >
        <div className="h-[calc(100vh-94px)] w-full overflow-auto p-4">
          {/* <CodeMirror
            value={code}
            theme={vscodeDark}
            onChange={onCodeChange}
            extensions={[javascript()]}
          /> */}
          <Editor
        height="100%"
        language={selectedLanguage}
        theme="vs-dark"
        value={code}
        onChange={(value) => onCodeChange(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
        </div>

        <div className="w-full px-5 overflow-auto">
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
    {problem.testCases &&
      problem.testCases.map((testcase, index) => (
        <div
          key={testcase.id}
          className=""
          onClick={() => setActiveTestCaseId(index)}
        >
          <div
            className={`${getStatusClass()} font-medium w-full text-center transition-all focus:outline-none rounded-md px-3 py-1 cursor-pointer
              ${activeTestCaseId === index ? "bg-dark-layer-2" : "bg-neutral-800"}
            `}
          >
            Case - {index + 1}
          </div>
        </div>
      ))}
  </div>

  <div className="font-semibold w-full mb-4">
    <p className="text-sm font-medium mt-4 text-white">Input:</p>
    <div className={` bg-dark-layer-2 w-full cursor-text rounded-lg border px-3 py-[10px] border-transparent
     text-white mt-2`}>
      <pre>
        {problem.testCases ? problem.testCases[activeTestCaseId].description : ""}
      </pre>
    </div>
    <p className="text-sm font-medium mt-4 text-white">Expected Output:</p>
    <div className={`${status?"text-[#27AE60]":"text-white"} bg-dark-layer-2 w-full cursor-text rounded-lg border px-3 py-[10px] border-transparent
      mt-2`}>
      <pre>
        {problem.testCases ? problem.testCases[activeTestCaseId].expected : ""}
      </pre>
    </div>
   {status &&  <><p className="text-sm font-medium mt-4 text-white">Actual Output:</p>
    <div className={`${getStatusClass()} w-full cursor-text rounded-lg border px-3 py-[10px] border-transparent
      mt-2 overflow-x-hidden`}>
      <pre>
        {status.testCase && status.testCase?.output}
        {status.results && JSON.stringify(status.results[activeTestCaseId].output)}
      </pre>
    </div></> }
  </div>
</div>

        </div>
      </Split>
    </div>
  );
};

export default Playground;