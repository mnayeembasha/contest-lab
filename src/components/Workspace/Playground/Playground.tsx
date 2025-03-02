import { ProblemType } from "@/utils/types/problem";
import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import Split from "react-split";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { customizedToast } from "@/utils/Toast/Toast";

type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

interface PlaygroundProps {
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


const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
  const languages = Object.keys(problem.starterCode || {});
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [userCode,setUserCode] = useState<string>(
    problem.starterCode[selectedLang as keyof typeof problem.starterCode] || ""
  );
  const [isFullScreen,setIsFullScreen] = useState(false);
  const [activeTestCaseId,setActiveTestCaseId] = useState<number>(0);
  const [loading,setLoading] = useState<boolean>(false);
  const [status,setStatus] = useState<(SuccessStatus&FailureStatus)|null>(null);

  useEffect(() => {
    setUserCode(
      problem.starterCode[selectedLang as keyof typeof problem.starterCode]
    );
  }, [selectedLang, problem.starterCode,problem]);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleRun = async () => {
    console.log("Selected Language:", selectedLang);
    console.log("User Code:", userCode);
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/run`,
        {
          code: userCode,
          language: selectedLang,
          slug: problem.slug,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setStatus(res.data);
      customizedToast({ type: "success", message: res.data?.message });

      console.log("expected output=", res.data?.testCase?.expected);
      console.log("Actual output=", res.data?.testCase?.output);
      console.log("results=", res.data?.results);
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message);
        customizedToast({
          type: "error",
          position: "top-center",
          message: error.response?.data?.message || "An unexpected error occurred",
        });
      } else {
        console.error("Unexpected error:", error);
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

  const handleSubmit=()=>{

  }

  const getStatusClass = () => {
    if (status?.message) return "text-[#27AE60] bg-dark-layer-2";
    if (status?.error) return "text-[#C0392B] bg-dark-layer-2";
    return "bg-dark-fill-3 text-white";
  };

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
          <EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} loading={loading}/>

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
        {/* {problem.testCases ? JSON.stringify(problem.testCases) : "Hi"} */}
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
      {/* <EditorFooter handleSubmit={handleSubmit} /> */}
    </div>
  );
};

export default Playground;



