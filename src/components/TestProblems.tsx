import confetti from 'canvas-confetti';
import { useEffect, useState, useContext } from 'react';
import ProblemList from './ProblemList';
import { convertPrimaryToSecondaryScore, randomPraise } from '../utils';
import { PART_2_BEGIN_TYPE } from '../config';
import { validateAnswers } from '../api';
import ProblemContext from '../contexts/ProblemContext';
import type { ProblemType } from '../types';
import Button from './ui/Button';

interface InputData {
  id: string;
  answer: string;
  correct: boolean | undefined;
}

interface Props {
  problems: ProblemType[];
}

function TestProblems({ problems }: Props) {
  const [score, setScore] = useState<number>(0);
  const [inputsData, setInputsData] = useState<InputData[]>([]);
  const problemContext = useContext(ProblemContext);

  useEffect(() => {
    setInputsData(problems.map((problem) => ({ id: problem.id, answer: '', correct: undefined })));
  }, [problems]);

  const isAllProblemsSolved =
    score > 0 && score === problems.filter((p) => p.type < PART_2_BEGIN_TYPE).length;

  useEffect(() => {
    if (isAllProblemsSolved) {
      confetti({
        particleCount: 100, // Количество частиц
        spread: 80, // Ширина разлета конфетти
        origin: { y: 0.8 }, // Начальная высота разлета
      });
    }
  }, [isAllProblemsSolved]);

  const setProblemAnswer = (id: string, answer: string) => {
    setInputsData(
      inputsData.map((inputData) => {
        if (inputData.id === id) {
          inputData.answer = answer;
        }
        return inputData;
      })
    );
  };

  const buttonClickHandler = async () => {
    const answers = inputsData.map((problem) => ({ id: problem.id, answer: +problem.answer }));
    const result = await validateAnswers(answers);

    const score = result.reduce(
      (acc: number, { correct }: { correct: boolean }) => acc + (correct ? 1 : 0),
      0
    );
    setScore(score);

    setInputsData(
      inputsData.map((problem) => {
        const correct = result.find(({ id }: { id: string }) => id === problem.id)?.correct;
        return { ...problem, correct };
      })
    );
  };

  const newProblemContext = { ...problemContext, onBlur: setProblemAnswer };

  return (
    <ProblemContext.Provider value={newProblemContext}>
      <ProblemList problems={problems} inputsData={inputsData} />
      <div className="flex gap-10 p-6 mt-[60px] mx-0 bg-white text-lg font-medium">
        <Button variant="success" className="text-lg" onClick={buttonClickHandler}>
          Подвести итоги
        </Button>
        <p className="grid gap-5 m-0">
          <span>
            Первичный балл: <b>{score}</b>
          </span>
          <span>
            Вторичный балл: <b>{convertPrimaryToSecondaryScore(score)}</b>
          </span>
        </p>
        {isAllProblemsSolved && <p className="my-auto mx-0 text-2xl font-bold">{randomPraise()}</p>}
      </div>
    </ProblemContext.Provider>
  );
}

export default TestProblems;
export type { InputData };
