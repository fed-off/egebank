import { useEffect, useState } from 'react';
import TestProblems from '../components/TestProblems';
import { ProblemType } from '../types';
import { API_BASE_URL } from '../config';

function RandomTestPage() {
  const [problems, setProblems] = useState<ProblemType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response: Response = await fetch(`${API_BASE_URL}/problems`);
      const data: ProblemType[] = await response.json();
      setProblems(data);
    }
    fetchData();
  }, []);

  return <TestProblems problems={problems} />;
}

export default RandomTestPage;
