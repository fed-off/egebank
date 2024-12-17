import { useState, useEffect, useRef } from 'react';
import { getProblemsByType } from '../api';
import { MAX_TYPE } from '../config';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    testName: string,
    typesCount: { [key: number]: number }
  ) => void;
}

function CreateTestModal({ isOpen, isLoading, onClose, onSubmit }: Props) {
  const [testName, setTestName] = useState<string>('');
  const [counts, setCounts] = useState<number[]>(Array(MAX_TYPE).fill(1));
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [problemsLength, setProblemsLength] = useState<number[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputFocus) return;

    const documentClickOutsideHandler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const documentKeydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', documentClickOutsideHandler);
      document.addEventListener('keydown', documentKeydownHandler);
    }

    return () => {
      document.removeEventListener('mousedown', documentClickOutsideHandler);
      document.removeEventListener('keydown', documentKeydownHandler);
    };
  }, [isOpen, inputFocus, onClose]);

  const SCROLL_BAR_WIDTH = '80px';
  useEffect(() => {
    if (isOpen && document.body.scrollHeight > window.innerHeight) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = SCROLL_BAR_WIDTH; // Prevent page from shifting
    }
    if (!isOpen) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      setTestName('');
      setCounts(Array(MAX_TYPE).fill(1));
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(
          Array.from({ length: MAX_TYPE }, (_, i) => getProblemsByType(`${i + 1}`))
        );
        setProblemsLength(responses.map((data) => data.length));
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
    fetchData();
  }, []);

  const updateCount = (index: number, newValue: number) => {
    const maxCount = problemsLength[index];
    const validatedValue = Math.min(Math.max(newValue, 0), maxCount);
    setCounts((prevCounts) => prevCounts.map((count, i) => (i === index ? validatedValue : count)));
  };

  const inputCountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value, 10) || 0;
    e.target.value = value.toString();
    updateCount(index, value);
  };
  const buttonIncremendHandler = (index: number) => updateCount(index, counts[index] + 1);
  const buttonDecremendHandler = (index: number) => updateCount(index, counts[index] - 1);
  const inputFocusHandler = () => setInputFocus(true);
  const inputBlurHandler = () => setInputFocus(false);

  const typesCount = counts.reduce<{ [key: number]: number }>((acc, count, index) => {
    acc[index + 1] = count;
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[800px] min-w-[800px] p-6 bg-white" ref={modalRef}>
        <Button className="absolute top-0 right-0 w-10 h-10" onClick={onClose}>
          <span className="sr-only">Закрыть</span>
          <span aria-hidden="true" role="presentation">
            X
          </span>
        </Button>
        <h2 className="text-3xl text-center m-0 mb-8">Создать тест</h2>
        <form autoComplete="off" onSubmit={(e) => onSubmit(e, testName, typesCount)}>
          <label className="flex items-center gap-4 w-fit mb-8 mx-auto pr-[90px]">
            <span className="text-xl">Название:</span>
            <Input
              className="w-[400px]"
              type="text"
              name="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          </label>
          <ol className="grid grid-cols-3 gap-6 list-none m-0 p-0">
            {Array.from({ length: MAX_TYPE }, (_, i) => (
              <li className="p-2 border-2 border-dotted" key={i}>
                <label className="flex justify-between items-center">
                  <span className="text-xl">Задание {i + 1}</span>
                  <div className="relative">
                    <Input
                      className="w-20 pr-8"
                      type="number"
                      name={`type-${i + 1}`}
                      min="0"
                      max={problemsLength[i]}
                      value={counts[i]}
                      onChange={(e) => inputCountChangeHandler(e, i)}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                    />
                    <button
                      className="block text-white absolute top-0 right-0 h-1/2 w-1/3 bg-[#767676] border-0 active:opacity-50 hover:opacity-75 cursor-pointer"
                      type="button"
                      onClick={() => buttonIncremendHandler(i)}
                    >
                      ↑
                    </button>
                    <button
                      className="block text-white absolute bottom-0 right-0 h-1/2 w-1/3 bg-[#767676] border-0 active:opacity-50 hover:opacity-75 cursor-pointer"
                      type="button"
                      onClick={() => buttonDecremendHandler(i)}
                    >
                      ↓
                    </button>
                  </div>
                </label>
              </li>
            ))}
          </ol>
          <Button
            className="block w-2/3 mt-8 mx-auto text-lg"
            variant="success"
            type="submit"
            disabled={!testName || isLoading}
          >
            {isLoading ? 'Создание...' : 'Создать'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateTestModal;
