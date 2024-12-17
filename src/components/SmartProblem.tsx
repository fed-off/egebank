import { useState } from 'react';
import Problem from './ui/Problem';
import { validateAnswer } from '../api';

interface Props {
  id: string;
  type?: number;
  index?: number;
  problemsCount?: number;
}

function SmartProblem({ id, type, index, problemsCount }: Props) {
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  const onBlur = async (problemId: string, answer: string) => {
    if (!answer) {
      return;
    }
    const isCorrect = await validateAnswer(problemId, +answer);
    setCorrect(isCorrect);
  };

  return <Problem {...{ id, type, correct, index, problemsCount, onBlur }} />;
}

export default SmartProblem;
