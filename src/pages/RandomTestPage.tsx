import { useEffect, useState } from 'react';
import TestProblems from '../components/TestProblems';
import { getProblems } from '../api';
import type { ProblemType } from '../types';

interface Props {
  updateTestTrigger: boolean;
}

function RandomTestPage({ updateTestTrigger }: Props) {
  const [problems, setProblems] = useState<ProblemType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const problems = await getProblems('random');
      setProblems(problems);
    }
    fetchData();
  }, [updateTestTrigger]);

  return <TestProblems problems={problems} />;
}

export default RandomTestPage;
