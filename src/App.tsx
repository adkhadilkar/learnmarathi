import { HashRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { PracticePage } from './pages/PracticePage';
import { AlphabetsPage } from './pages/AlphabetsPage';
import { BarakhadiPage } from './pages/BarakhadiPage';
import { JodaksharaPage } from './pages/JodaksharaPage';
import { NumbersPage } from './pages/NumbersPage';
import { AnimalsPage } from './pages/AnimalsPage';
import { StoriesPage } from './pages/StoriesPage';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <HashRouter>
      <PageLayout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/alphabets" element={<AlphabetsPage />} />
          <Route path="/barakhadi" element={<BarakhadiPage />} />
          <Route path="/jodakshara" element={<JodaksharaPage />} />
          <Route path="/numbers" element={<NumbersPage />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/stories" element={<StoriesPage />} />
        </Routes>
      </PageLayout>
    </HashRouter>
  );
}
