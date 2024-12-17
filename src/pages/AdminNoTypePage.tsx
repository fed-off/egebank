import { useState, useEffect } from 'react';
import NoTypeProblem from '../components/NoTypeProblem';
import { getProblems } from '../api';
import type { ProblemType } from '../types';

function AdminNoTypePage() {
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const problems = await getProblems('no-type');
      setProblems(problems);
    }
    fetchData();
  }, []);

  const switchToNextProblem = () => {
    setCurrentProblemIndex(currentProblemIndex + 1);
  };

  return (
    <>
      <p className="my-0 mx-auto w-fit">
        {currentProblemIndex + 1}/{problems.length}
      </p>
      <NoTypeProblem
        id={problems[currentProblemIndex]?.id}
        switchToNextProblem={switchToNextProblem}
      />
    </>
  );
}

export default AdminNoTypePage;
