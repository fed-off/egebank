import { useEffect, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { updateProblem } from '../api';
import { PART_2_BEGIN_TYPE } from '../config';

interface Props {
  id: string;
  type?: number;
  switchToNextProblem: () => void;
}

function NoAnswerProblem({ id, type, switchToNextProblem }: Props) {
  const [answer, setAnswer] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get('token') || '');
  }, []);

  const buttonClickHandler = async (event: React.MouseEvent<HTMLElement>, save: boolean) => {
    event.preventDefault();
    if (save) {
      const body: { token: string; answer?: number; textAnswer?: string } = { token };
      if (type && type >= PART_2_BEGIN_TYPE) {
        body['textAnswer'] = answer;
      } else {
        body['answer'] = +answer;
      }
      await updateProblem(id, body);
    }
    switchToNextProblem();
    setAnswer('');
  };

  if (!id) {
    return (
      <article className="flex flex-col items-center gap-3 w-fit min-h-[80vh] mx-auto p-12 bg-white">
        <p>Не осталось задач без ответа</p>
      </article>
    );
  }

  return (
    <article className="flex flex-col items-center gap-3 w-fit min-h-[80vh] mx-auto p-12 bg-white">
      <h2 className="m-0 mb-3">
        Задание {type} №{id}
      </h2>
      <img className="block w-fit" src={`/screenshots/${id}.png`} alt="Условие задачи" />
      <form className="flex flex-col gap-3 pt-7 w-60 mt-auto" action="#" method="POST">
        <label className="flex flex-col items-center gap-2.5 text-xl">
          <span>Установить ответ задачи:</span>
          <Input
            type={type && type >= PART_2_BEGIN_TYPE ? 'text' : 'number'}
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="warning" onClick={(e) => buttonClickHandler(e, false)}>
            Пропустить
          </Button>
          <Button
            variant="success"
            type="submit"
            onClick={(e) => buttonClickHandler(e, true)}
            disabled={answer === ''}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </article>
  );
}

export default NoAnswerProblem;
