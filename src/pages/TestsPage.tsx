import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TestProblems from '../components/TestProblems';
import ProblemContext from '../contexts/ProblemContext';
import { getTest } from '../api';
import type { Test } from '../types';

function TestsPage() {
  const [test, setTest] = useState<Test>();
  const { id } = useParams<{ id: string }>();
  const problemContext = useContext(ProblemContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const test = await getTest(id);
          setTest(test);
        }
      } catch {
        setTest(undefined);
      }
    }
    fetchData();
  }, [id]);

  if (!test) {
    return <p>Тест № {id} не найден.</p>;
  }

  const dateFormatted = new Date(test.createdAt).toLocaleDateString('ru-RU');
  const newProblemContext = { ...problemContext, showId: false };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        Тест № {id} ({test.name})<br />
        <i style={{ fontSize: 'small', fontWeight: 'medium' }}>от {dateFormatted}</i>
      </h1>
      <ProblemContext.Provider value={newProblemContext}>
        <TestProblems problems={test.problems} />
      </ProblemContext.Provider>
    </>
  );
}

export default TestsPage;
