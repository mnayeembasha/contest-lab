import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { ProblemType } from "@/utils/types/problem";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

type WorkspaceProps = {
  problem: ProblemType;
  code: string;
  selectedLanguage: string;
  onCodeChange: (newCode: string) => void;
  onLanguageChange: (language: "python"|"java"|"c"|"c++"|"javascript" )=> void;
};

const Workspace: React.FC<WorkspaceProps> = ({
  problem,
  code,
  selectedLanguage,
  onCodeChange,
  onLanguageChange,
}) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);

  return (
    <Split className="split min-h-screen" minSize={0}>
      <ProblemDescription problem={problem} _solved={solved} />
      <div className="bg-dark-fill-2">
        <Playground
          problem={problem}
          code={code}
          selectedLanguage={selectedLanguage}
          onCodeChange={onCodeChange}
          onLanguageChange={onLanguageChange}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  );
};

export default Workspace;