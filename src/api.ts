import { API_BASE_URL } from './config';

const request = async (path: string, method: string = 'GET', rawBody?: object | []) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const body = rawBody ? JSON.stringify(rawBody) : undefined;

  const url = new URL(path, API_BASE_URL);

  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};

export const validateAnswers = async (
  answers: { id: string; answer: number }[]
): Promise<{ id: string; correct: boolean }[]> => {
  return await request('/problems/validate-answers', 'POST', answers);
};

export const validateAnswer = async (id: string, answer: number): Promise<boolean> => {
  const answers = [{ id, answer }];
  const result = await validateAnswers(answers);
  return result[0].correct;
};
