import { useState, useEffect } from 'react';
import NoAnswerProblem from '../components/NoAnswerProblem';
import { getProblems } from '../api';

interface Problem {
  id: string;
  type: number;
}

function AdminNoAnswerPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemTypes, setProblemTypes] = useState<number[]>([]);
  const [selectedType, setSelectedType] = useState<string>('0');
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const problems = await getProblems('no-answer');
      setProblems(problems);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const types: number[] = [];
    problems.forEach((problem) => {
      if (problem.type && !types.includes(problem.type)) {
        types.push(problem.type);
      }
    });
    types.sort((a, b) => a - b);
    setProblemTypes(types);
  }, [problems]);

  const switchToNextProblem = () => {
    setCurrentProblemIndex(currentProblemIndex + 1);
  };

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    setCurrentProblemIndex(0);
  };

  return (
    <>
      <label className="block my-0 mx-auto w-fit">
        <span>Тип задания:</span>
        <select value={selectedType} onChange={selectChangeHandler}>
          <option value="0">Все</option>
          {problemTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <p className="my-0 mx-auto w-fit">
        {currentProblemIndex + 1}/
        {problems.filter((problem) => +selectedType === 0 || problem.type === +selectedType).length}
      </p>
      <NoAnswerProblem
        id={
          problems.filter((problem) => +selectedType === 0 || problem.type === +selectedType)[
            currentProblemIndex
          ]?.id
        }
        type={selectedType === '0' ? undefined : +selectedType}
        switchToNextProblem={switchToNextProblem}
      />
    </>
  );
}

export default AdminNoAnswerPage;
