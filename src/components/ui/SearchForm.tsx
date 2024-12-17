import { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, problemId: string) => void;
}

function SearchForm({ onSubmit }: Props) {
  const [problemId, setProblemId] = useState<string>('');

  return (
    <form onSubmit={(e) => onSubmit(e, problemId)} className="flex gap-3 w-fit mt-0 mx-auto mb-5">
      <label className="flex gap-3 items-center text-xl m-0 mx-auto w-fit">
        <span>№ задачи:</span>
        <Input type="text" value={problemId} onChange={(e) => setProblemId(e.target.value)} />
      </label>
      <Button variant="light" type="submit">
        Найти
      </Button>
    </form>
  );
}

export default SearchForm;
