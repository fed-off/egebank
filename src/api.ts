import { API_BASE_URL } from './config';
import type { ProblemType, Test } from './types';

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

export const updateProblem = async (id: string, changes: object): Promise<void> => {
  await request(`/problems/${id}`, 'PATCH', changes);
};

export const getProblems = async (
  kind: 'random' | 'no-answer' | 'no-type'
): Promise<ProblemType[]> => {
  switch (kind) {
    case 'random':
      return await request('/problems');
    case 'no-answer':
      return await request('/problems/noanswer');
    case 'no-type':
      return await request('/problems/notype');
    default:
      throw new Error('Invalid kind');
  }
};

export const getProblemsByType = async (type: string): Promise<ProblemType[]> => {
  return await request(`/problems/type/${type}`);
};

export const getProblem = async (id: string): Promise<ProblemType> => {
  return await request(`/problems/${id}`);
};

export const getProblemWithAnswer = async (
  id: string,
  token: string
): Promise<ProblemType & { answer: number }> => {
  return await request(`/problems/${id}?token=${token}`);
};

export const getTests = async (token: string): Promise<Test[]> => {
  return await request(`/tests?token=${token}`);
};

export const getTest = async (id: string): Promise<Test> => {
  return await request(`/tests/${id}`);
};

export const generateTest = async (
  name: string,
  token: string,
  typesCount?: { [key: number]: number }
): Promise<void> => {
  return await request(`/tests?token=${token}`, 'POST', { name, typesCount });
};

export const deleteTest = async (id: number, token: string): Promise<void> => {
  return await request(`/tests/${id}?token=${token}`, 'DELETE');
};

export const getTestAnswers = async (
  testId: number,
  token: string
): Promise<{ id: string; type: number; answer?: number; textAnswer?: string }[]> => {
  return await request(`/tests/${testId}/answers?token=${token}`);
};
