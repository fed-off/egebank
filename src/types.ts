interface ProblemType {
  id: string;
  type: number;
}

interface Test {
  _id: number;
  name: string;
  createdAt: string;
  problems: ProblemType[];
}

export type { ProblemType, Test };
