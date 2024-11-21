import { useState, useEffect } from 'react';
import NoTypeProblem from '../components/NoTypeProblem';

import { API_BASE_URL } from '../config';

function AdminNoTypePage() {
  const [problemIds, setProblemIds] = useState<string[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const response: Response = await fetch(`${API_BASE_URL}/problems/notype`);
      const data: string[] = await response.json();
      setProblemIds(data);
    }
    fetchData();
  }, []);

  const switchToNextProblem = () => {
    setCurrentProblemIndex(currentProblemIndex + 1);
  };

  return (
    <>
      <p className="my-0 mx-auto w-fit">
        {currentProblemIndex + 1}/{problemIds.length}
      </p>
      <NoTypeProblem
        id={problemIds[currentProblemIndex]}
        switchToNextProblem={switchToNextProblem}
      />
    </>
  );
}

export default AdminNoTypePage;
