import { useEffect, useState } from 'react';

import { API_BASE_URL } from '../config';

interface Props {
  id: string;
  type: number;
  answer: number;
  fetchProblem: (id: string) => void;
}

function UpdateProblem({ id, type, answer, fetchProblem }: Props) {
  const [token, setToken] = useState<string>('');
  const [newType, setNewType] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get('token') || '');
  }, []);

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const changes: { type?: number; answer?: number } = {};
    if (newType) {
      changes.type = +newType;
    }
    if (newAnswer) {
      changes.answer = +newAnswer;
    }
    await fetch(`${API_BASE_URL}/problems/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...changes, token }),
    });
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
              <input
                className="w-full min-h-10 p-2 border text-lg text-center"
                type="number"
                onChange={(e) => setNewType(e.target.value)}
                value={newType}
              />
            </label>
          </div>
          <div>
            <p className="text-xl text-center">
              Ответ задачи: <b>{answer}</b>
            </p>
            <label className="flex flex-col items-center gap-2.5 text-base">
              <span>изменить на:</span>
              <input
                className="w-full min-h-10 p-2 border text-lg text-center"
                type="number"
                onChange={(e) => setNewAnswer(e.target.value)}
                value={newAnswer}
              />
            </label>
          </div>
        </div>
        <button
          className="min-h-12 p-2.5 bg-green-400 border-0 cursor-pointer text-white font-[inherit] uppercase font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed enabled:hover:brightness-110 focus-visible:brightness-110 enabled:active:brightness-90"
          type="submit"
          disabled={newAnswer === '' && newType === ''}
        >
          Сохранить
        </button>
      </form>
    </article>
  );
}

export default UpdateProblem;
