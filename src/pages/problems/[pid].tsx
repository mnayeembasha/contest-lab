import { useRouter } from "next/router";
import DotSpinner from  "../../components/Loader/DotSpinner";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import useHasMounted from "@/hooks/useHasMounted";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import Workspace from "@/components/Workspace/Workspace";
import { ProblemType } from "@/utils/types/problem";

const ProblemPage = () =>{
  const [problem, setProblem] = useState<ProblemType | undefined>();
  const { loading, setLoading } = useAuth();

  const hasMounted = useHasMounted();
	const router = useRouter();
	const {pid} = router.query;

  useEffect(() => {
    if(!pid)return;

    const getQuestion = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/questions/${pid}`);
        setProblem(res.data);
      } catch (error) {
        console.log("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    getQuestion();
  }, [pid]);

  if (!hasMounted) {
    return null;
  }

  if (!problem || loading) {
    return <DotSpinner/>;
  }

	return <Workspace problem={problem as ProblemType}/>

}

export default ProblemPage;