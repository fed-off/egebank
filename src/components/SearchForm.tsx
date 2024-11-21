import { useState } from 'react';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, problemId: string) => void;
}

function SearchForm({ onSubmit }: Props) {
  const [problemId, setProblemId] = useState<string>('');

  return (
    <form onSubmit={(e) => onSubmit(e, problemId)} className="flex gap-3 w-fit mt-0 mx-auto mb-5">
      <label className="block m-0 mx-auto w-fit">
        № задачи:
        <input type="text" value={problemId} onChange={(e) => setProblemId(e.target.value)} />
      </label>
      <button type="submit">Найти</button>
    </form>
  );
}

export default SearchForm;
