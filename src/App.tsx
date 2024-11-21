import { Routes, Route, useLocation } from 'react-router-dom';

import RandomTestPage from './pages/RandomTestPage';
import TestsPage from './pages/TestsPage';
import AdminNoTypePage from './pages/AdminNoTypePage';
import AdminNoAnswerPage from './pages/AdminNoAnswerPage';
import AdminUpdateProblemPage from './pages/AdminUpdateProblemPage';
import AdminTestsPage from './pages/AdminTestsPage';
import TypePage from './pages/TypePage';
import SearchPage from './pages/SearchPage';
import Navigation from './components/Navigation';

function App() {
  const location = useLocation();
  const pathsWithNavigation = [
    '/',
    '/search',
    ...Array.from({ length: 12 }, (_, i) => `/${i + 1}`),
  ];

  return (
    <div className="grid gap-10">
      {pathsWithNavigation.includes(location.pathname) && <Navigation />}
      <Routes>
        <Route path="/" element={<RandomTestPage />} />
        <Route path="/:id" element={<TypePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tests/:id" element={<TestsPage />} />
        <Route path="/admin/notype" element={<AdminNoTypePage />} />
        <Route path="/admin/noanswer" element={<AdminNoAnswerPage />} />
        <Route path="/admin/problem" element={<AdminUpdateProblemPage />} />
        <Route path="/admin/tests" element={<AdminTestsPage />} />
      </Routes>
    </div>
  );
}

export default App;
