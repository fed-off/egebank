import { useEffect, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { updateProblem } from '../api';
import { PART_2_BEGIN_TYPE } from '../config';

interface Props {
  id: string;
  type: number;
  answer?: number;
  textAnswer?: string;
  fetchProblem: (id: string) => void;
}

function UpdateProblem({ id, type, answer, textAnswer, fetchProblem }: Props) {
  const [token, setToken] = useState<string>('');
  const [newType, setNewType] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get('token') || '');
  }, []);

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const changes: { type?: number; answer?: number; textAnswer?: string } = {};
    if (newType) {
      changes.type = +newType;
    }
    if (newAnswer) {
      const problemType = newType ? +newType : type;
      if (problemType >= PART_2_BEGIN_TYPE) {
        changes.textAnswer = newAnswer;
      } else {
        changes.answer = +newAnswer;
      }
    }
    await updateProblem(id, { ...changes, token });
    fetchProblem(id);
    setNewType('');
    setNewAnswer('');
  };

  return (
    <article className="flex flex-col items-center gap-3 w-fit min-h-[80vh] mx-auto p-12 bg-white">
      <h2 className="m-0 mb-3">Задание №{id}</h2>
      <img className="block w-fit" src={`/screenshots/${id}.png`} alt="Условие задачи" />
      <form
        className="flex flex-col gap-3 pt-7 w-115 mt-auto"
        action="#"
        method="POST"
        onSubmit={formSubmitHandler}
      >
        <div className="grid grid-cols-2 justify-between gap-10 mb-3">
          <div>
            <p className="text-xl text-center">
              Тип задачи: <b>{type}</b>
            </p>
            <label className="flex flex-col items-center gap-2.5 text-base">
              <span>изменить на:</span>
              <Input type="number" onChange={(e) => setNewType(e.target.value)} value={newType} />
            </label>
          </div>
          <div>
            <p className="text-xl text-center">
              Ответ задачи: <b>{type >= PART_2_BEGIN_TYPE ? textAnswer : answer}</b>
            </p>
            <label className="flex flex-col items-center gap-2.5 text-base">
              <span>изменить на:</span>
              <Input
                type={type >= PART_2_BEGIN_TYPE ? 'text' : 'number'}
                onChange={(e) => setNewAnswer(e.target.value)}
                value={newAnswer}
              />
            </label>
          </div>
        </div>
        <Button variant="success" type="submit" disabled={newAnswer === '' && newType === ''}>
          Сохранить
        </Button>
      </form>
    </article>
  );
}

export default UpdateProblem;
