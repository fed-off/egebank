import { useEffect, useState } from 'react';

import { API_BASE_URL } from '../config';

interface Props {
  id: string;
  switchToNextProblem: () => void;
}

function NoTypeProblem({ id, switchToNextProblem }: Props) {
  const [type, setType] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get('token') || '');
  }, []);

  const buttonClickHandler = (event: React.MouseEvent<HTMLElement>, save: boolean) => {
    event.preventDefault();
    if (save) {
      fetch(`${API_BASE_URL}/problems/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: parseInt(type),
          token,
        }),
      });
    }
    switchToNextProblem();
    setType('');
  };

  if (!id) {
    return (
      <article className="flex flex-col items-center gap-3 w-fit min-h-[80vh] mx-auto p-12 bg-white">
        <p>Не осталось задач без типа</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col items-center gap-3 w-fit min-h-[80vh] mx-auto p-12 bg-white">
      <h2 className="m-0 mb-3">Задание №{id}</h2>
      <img className="block w-fit" src={`/screenshots/${id}.png`} alt="Условие задачи" />
      <form className="flex flex-col gap-3 pt-7 w-60 mt-auto" action="#" method="POST">
        <label className="flex flex-col items-center gap-2.5 text-xl">
          <span>Указать тип задачи:</span>
          <input
            className="w-full min-h-10 p-2 border text-lg text-center"
            type="number"
            min="1"
            max="20"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="min-h-10 p-2.5 bg-orange-400 border-0 cursor-pointer text-white font-[inherit] uppercase font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed enabled:hover:brightness-110 focus-visible:brightness-110 enabled:active:brightness-90"
            type="button"
            onClick={(e) => buttonClickHandler(e, false)}
          >
            Пропустить
          </button>
          <button
            className="min-h-10 p-2.5 bg-green-400 border-0 cursor-pointer text-white font-[inherit] uppercase font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed enabled:hover:brightness-110 focus-visible:brightness-110 enabled:active:brightness-90"
            type="submit"
            onClick={(e) => buttonClickHandler(e, true)}
            disabled={type === ''}
          >
            Сохранить
          </button>
        </div>
      </form>
    </article>
  );
}

export default NoTypeProblem;
