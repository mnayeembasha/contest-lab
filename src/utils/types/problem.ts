export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
};
export type Testcase = {
  id?: number;
  input: string;
  expected: string;
  description?:string;
};

export type ProblemType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  starterCode: {
    python: string;
    javascript: string;
    java: string;
    c: string;
    "c++": string;
  };
  constraints?: string[];
  image?: string;
  examples?: Example[];
  testCases?: Testcase[];
};
