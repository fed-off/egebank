import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RandomTestPage from './pages/RandomTestPage';
import TestsPage from './pages/TestsPage';
import AdminNoTypePage from './pages/AdminNoTypePage';
import AdminNoAnswerPage from './pages/AdminNoAnswerPage';
import AdminUpdateProblemPage from './pages/AdminUpdateProblemPage';
import AdminTestsPage from './pages/AdminTestsPage';
import TypePage from './pages/TypePage';
import SearchPage from './pages/SearchPage';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

function App() {
  const [updateTestTrigger, setUpdateTestTrigger] = useState<boolean>(false);
  const toggleUpdateTestTrigger = () => setUpdateTestTrigger((prev) => !prev);
  return (
    <>
      <PageHeader onTestClick={toggleUpdateTestTrigger} />
      <main className="grid gap-10 py-10">
        <Routes>
          <Route path="/" element={<RandomTestPage updateTestTrigger={updateTestTrigger} />} />
          <Route path="/:id" element={<TypePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tests/:id" element={<TestsPage />} />
          <Route path="/admin/notype" element={<AdminNoTypePage />} />
          <Route path="/admin/noanswer" element={<AdminNoAnswerPage />} />
          <Route path="/admin/problem" element={<AdminUpdateProblemPage />} />
          <Route path="/admin/tests" element={<AdminTestsPage />} />
        </Routes>
      </main>
      <PageFooter />
    </>
  );
}

export default App;
