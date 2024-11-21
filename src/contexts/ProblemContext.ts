import { createContext } from 'react';

interface ContextType {
  showId: boolean;
  showCounter: boolean;
  onBlur: (problemId: string, answer: string) => void;
}

const defaultContext: ContextType = {
  showId: true,
  showCounter: false,
  onBlur: () => {},
};

const ProblemContext = createContext<ContextType>(defaultContext);

export default ProblemContext;
