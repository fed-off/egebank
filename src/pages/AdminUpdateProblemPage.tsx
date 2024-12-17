import { useState, useEffect } from 'react';
import SearchForm from '../components/ui/SearchForm';
import UpdateProblem from '../components/UpdateProblem';
import { getProblemWithAnswer } from '../api';

interface Problem {
  id: string;
  type: number;
  answer: number;
}

function AdminUpdateProblemPage() {
  const [token, setToken] = useState<string>('');
  const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get('token') || '');
  }, []);

  const fetchProblem = async (id: string) => {
    try {
      const problem = await getProblemWithAnswer(id, token);
      setProblem(problem);
    } catch {
      setProblem(null);
    }
  };

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>, problemId: string) => {
    event.preventDefault();
    fetchProblem(problemId);
  };

  return (
    <>
      <SearchForm onSubmit={formSubmitHandler} />
      {problem === null && <p className="text-center">Задача не найдена</p>}
      {problem && <UpdateProblem {...problem} fetchProblem={fetchProblem} />}
    </>
  );
}

export default AdminUpdateProblemPage;
