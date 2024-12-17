import { useState } from 'react';
import SearchForm from '../components/ui/SearchForm';
import SmartProblem from '../components/SmartProblem';
import { getProblem } from '../api';
import type { ProblemType } from '../types';

function SearchPage() {
  const [problem, setProblem] = useState<ProblemType | null>(null);

  const fetchProblem = async (id: string) => {
    try {
      const problem = await getProblem(id);
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
      {problem && <SmartProblem {...problem} />}
    </>
  );
}

export default SearchPage;
