import Problem from './Problem';
import type { InputData } from './TestProblems';
import type { ProblemType } from '../types';

import SmartProblem from './SmartProblem';

interface Props {
  problems: ProblemType[];
  inputsData?: InputData[];
  smart?: boolean;
}

function ProblemList({ problems, inputsData = [], smart = false }: Props) {
  const mergedProblemsData = smart
    ? problems
    : problems.map((problem) => {
        const inputData = inputsData.find((input) => input.id === problem.id);
        return { ...problem, correct: inputData?.correct };
      });

  if (!problems.length) {
    return <p>Нет задач</p>;
  }

  return (
    <ul className="flex flex-col gap-9 m-0 p-0 list-none">
      {mergedProblemsData.map((problemData, i) => (
        <li key={problemData.id}>
          {smart ? (
            <SmartProblem
              {...problemData}
              index={i + 1}
              problemsCount={mergedProblemsData.length}
            />
          ) : (
            <Problem {...problemData} index={i + 1} problemsCount={mergedProblemsData.length} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProblemList;
