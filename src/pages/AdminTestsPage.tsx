import { useState, useEffect, useCallback } from 'react';
import Button from '../components/ui/Button';
import CreateTestModal from '../components/CreateTestModal';
import { getTests, generateTest, deleteTest, getTestAnswers } from '../api';
import { PART_2_BEGIN_TYPE } from '../config';
import type { Test } from '../types';

function AdminTestsPage() {
  const [token, setToken] = useState<string>('');
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние загрузки для защиты от повторных запросов
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);

  const fetchTests = useCallback(async () => {
    if (token) {
      const tests = await getTests(token);
      setTests(tests);
    }
  }, [token]);

  const formSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    testName: string,
    typesCount: { [key: number]: number }
  ) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await generateTest(testName, token, typesCount);
      fetchTests();
      setModalDisplay(false);
    } catch (error) {
      console.error('Error adding test:', error);
      alert('Ошибка создания теста');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonDeleteHandler = async (id: number, name: string) => {
    const yes = confirm(`Удалить тест "${name}"?`);
    if (!yes) {
      return;
    }
    try {
      await deleteTest(id, token);
      fetchTests();
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Ошибка удаления теста');
    }
  };

  const buttonAnswersHandler = async (testId: number) => {
    const testAnswers = await getTestAnswers(testId, token);
    const lines = testAnswers.map(
      (answer) =>
        `${answer.type} | ${answer.id} | ${answer.type >= PART_2_BEGIN_TYPE ? answer.textAnswer : answer.answer}`
    );
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
      <CreateTestModal
        isOpen={modalDisplay}
        isLoading={isLoading}
        onClose={() => setModalDisplay(false)}
        onSubmit={formSubmitHandler}
      />
      <Button
        className="w-[150px] mx-auto"
        variant="light"
        type="button"
        onClick={() => setModalDisplay(true)}
      >
        Создать
      </Button>
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
                  <Button onClick={() => buttonAnswersHandler(test._id)}>Ответы</Button>
                </td>
                <td className="border border-gray-400 border-solid p-2 text-center">
                  <Button variant="danger" onClick={() => buttonDeleteHandler(test._id, test.name)}>
                    Удалить
                  </Button>
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
