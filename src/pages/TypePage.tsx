import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import ProblemContext from '../contexts/ProblemContext';
import ProblemList from '../components/ProblemList';
import type { ProblemType } from '../types';

function TypePage() {
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const { id } = useParams<{ id: string }>();
  const problemContext = useContext(ProblemContext);

  useEffect(() => {
    async function fetchData() {
      const response: Response = await fetch(`${API_BASE_URL}/problems/type/${id}`);
      if (response.ok) {
        const problems: ProblemType[] = await response.json();
        setProblems(problems);
      }
    }
    fetchData();
  }, [id]);

  const newProblemContext = { ...problemContext, showId: true, showCounter: true };

  return (
    <>
      <h1 className="text-center m-0">Задания типа {id}</h1>
      <ProblemContext.Provider value={newProblemContext}>
        <ProblemList problems={problems} smart />
      </ProblemContext.Provider>
    </>
  );
}

export default TypePage;
