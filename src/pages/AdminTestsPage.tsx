import { useState, useEffect, useCallback } from 'react';

import { API_BASE_URL } from '../config';
import type { Test } from '../types';

interface TestAnswer {
  id: string;
  type: number;
  answer: number;
}

function AdminTestsPage() {
  const [testName, setTestName] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние загрузки для защиты от повторных запросов

  const fetchTests = useCallback(async () => {
    if (token) {
      const response: Response = await fetch(`${API_BASE_URL}/tests?token=${token}`);
      if (!response.ok) {
        return;
      }
      const data: Test[] = await response.json();
      setTests(data);
    }
  }, [token]);

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const responce = await fetch(`${API_BASE_URL}/tests?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: testName }),
      });
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      setTestName('');
      fetchTests();
      alert(`Тест "${testName}" СОЗДАН`);
    } catch (error) {
      console.error('Error adding test:', error);
      alert('Ошибка создания теста');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonDeleteHandler = async (id: number, name: string) => {
    const confirmation = prompt(`Введите "удалить" для удаления теста №${id} - "${name}":`);
    if (confirmation?.toLowerCase() !== 'удалить') {
      return;
    }
    try {
      const responce = await fetch(`${API_BASE_URL}/tests/${id}?token=${token}`, {
        method: 'DELETE',
      });
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      fetchTests();
      alert(`Тест "${name}" УДАЛЕН`);
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Ошибка удаления теста');
    }
  };

  const buttonAnswersHandler = async (testId: number) => {
    const response: Response = await fetch(
      `${API_BASE_URL}/tests/${testId}/answers?token=${token}`
    );
    if (!response.ok) {
      alert('Ошибка получения ответов');
      return;
    }
    const testAnswers: TestAnswer[] = await response.json();
    const lines = testAnswers.map((answer) => `${answer.type} | ${answer.id} | ${answer.answer}`);
    const message = lines.join('\n');
    alert(`Ответы на тест ${testId}:\n${message}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get('token') || '');
  }, []);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  return (
    <>
      <form className="flex gap-2.5 w-fit mt-0 mx-auto mb-11" onSubmit={formSubmitHandler}>
        <label className="flex gap-2.5 w-fit">
          <span>Название теста:</span>
          <input type="text" onChange={(e) => setTestName(e.target.value)} value={testName} />
        </label>
        <button
          className="block my-0 mx-auto min-w-[100px]"
          type="submit"
          disabled={isLoading || !testName}
        >
          {isLoading ? 'Создание...' : 'Создать'}
        </button>
      </form>
      <table className="w-4/5 border-collapse my-0 mx-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 border-solid p-2">№</th>
            <th className="border border-gray-400 border-solid p-2">Дата создания</th>
            <th className="border border-gray-400 border-solid p-2">Название</th>
            <th className="border border-gray-400 border-solid p-2">Ответы</th>
            <th className="border border-gray-400 border-solid p-2">Операции</th>
          </tr>
        </thead>
        <tbody>
          {tests.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-2 text-center">
                Тестов нет
              </td>
            </tr>
          ) : (
            tests.map((test) => (
              <tr key={test._id}>
                <td className="border border-gray-400 border-solid p-2 text-center">{test._id}</td>
                <td className="border border-gray-400 border-solid p-2 text-center">
                  {new Date(test.createdAt).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </td>
                <td className="border border-gray-400 border-solid p-2 text-center">
                  <a href={`/tests/${test._id}`} target="_blank">
                    {test.name}
                  </a>
                </td>
                <td className="border border-gray-400 border-solid p-2 text-center">
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => buttonAnswersHandler(test._id)}
                  >
                    Ответы
                  </button>
                </td>
                <td className="border border-gray-400 border-solid p-2 text-center">
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => buttonDeleteHandler(test._id, test.name)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default AdminTestsPage;
