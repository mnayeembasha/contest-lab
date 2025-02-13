import { ProblemType } from "./problem";

export interface Contest {
    contestId: string;
    contestName: string;
    startTime: string;
    duration: string;
    problems: ProblemType[];
    isActive: boolean;
  }