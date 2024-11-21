import { useState } from 'react';
import { API_BASE_URL } from '../config';
import SearchForm from '../components/SearchForm';
import SmartProblem from '../components/SmartProblem';
import type { ProblemType } from '../types';

function SearchPage() {
  const [problem, setProblem] = useState<ProblemType | null>(null);

  const fetchProblem = async (id: string) => {
    const resp = await fetch(`${API_BASE_URL}/problems/${id}`);
    if (!resp.ok) {
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
      {problem && <SmartProblem {...problem} />}
    </>
  );
}

export default SearchPage;
