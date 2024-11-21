import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import UpdateProblem from '../components/UpdateProblem';

import { API_BASE_URL } from '../config';

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
    const resp = await fetch(`${API_BASE_URL}/problems/${id}?token=${token}`);
    if (resp.status === 404) {
      setProblem(null);
      return;
    }
    setProblem(await resp.json());
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
