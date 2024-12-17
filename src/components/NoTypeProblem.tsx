import { useEffect, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { updateProblem } from '../api';

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

  const buttonClickHandler = async (event: React.MouseEvent<HTMLElement>, save: boolean) => {
    event.preventDefault();
    if (save) {
      await updateProblem(id, {
        type: parseInt(type),
        token,
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
          <Input
            className="w-full"
            type="number"
            min="1"
            max="20"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="warning" onClick={(e) => buttonClickHandler(e, false)}>
            Пропустить
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={type === ''}
            onClick={(e) => buttonClickHandler(e, true)}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </article>
  );
}

export default NoTypeProblem;
