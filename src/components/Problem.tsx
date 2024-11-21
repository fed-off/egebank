import { useContext } from 'react';
import ProblemContext from '../contexts/ProblemContext';

interface Props {
  id: string;
  type?: number;
  correct?: boolean;
  showId?: boolean;
  showCounter?: boolean;
  index?: number;
  problemsCount?: number;
  onBlur?: (problemId: string, answer: string) => void;
}

function Problem(props: Props) {
  const context = useContext(ProblemContext);

  const { id, type, correct, index, problemsCount } = props;
  const showId = props.showId ?? context.showId;
  const showCounter = props.showCounter ?? context.showCounter;
  const onBlur = props.onBlur ?? context.onBlur;

  return (
    <article className="flex flex-col gap-3 p-6 bg-white">
      <div className="flex justify-between">
        <h2 className="m-0 mb-3">
          Задание {type} {showId && `№${id}`}
        </h2>
        {showCounter && <p className="m-0">{`${index}/${problemsCount}`}</p>}
      </div>
      <img className="block w-fit" src={`/screenshots/${id}.png`} alt="Условие задачи" />
      <label className="flex items-center gap-3 w-fit mt-7 text-lg">
        <span>Ваш ответ:</span>
        <input
          className={`w-[100px] min-h-6 p-2 border-2 border-solid border-gray-300 rounded text-base text-center ${correct === undefined ? '' : correct === true ? 'border-green-200' : 'border-red-200'}`}
          type="number"
          onBlur={(e) => onBlur(id, e.target.value)}
        />
        <i>{correct === undefined ? '' : correct === true ? 'Верно!' : 'Неверно'}</i>
      </label>
    </article>
  );
}

export default Problem;
