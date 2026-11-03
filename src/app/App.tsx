import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { RouteErrorBoundary } from './RouteErrorBoundary';
import { topics, type TopicId } from '../data/topics';

const Home = lazy(() => import('../pages/Home/Home'));
const Learning = lazy(() => import('../pages/Learning/Learning'));
const World = lazy(() => import('../pages/World/World'));
const Game = lazy(() => import('../pages/Game/Game'));
const Level = lazy(() => import('../pages/Level/Level'));
const Progress = lazy(() => import('../pages/Progress/Progress'));
const lessonPages: Record<TopicId, ReturnType<typeof lazy>> = {
  equation: lazy(() => import('../pages/Lessons/EquationLesson')),
  balance: lazy(() => import('../pages/Lessons/BalanceLesson')),
  'both-sides': lazy(() => import('../pages/Lessons/BothSidesLesson')),
  unknown: lazy(() => import('../pages/Lessons/UnknownLesson')),
  parts: lazy(() => import('../pages/Lessons/PartsLesson')),
  'inverse-operations': lazy(() => import('../pages/Lessons/InverseOperationsLesson')),
  solve: lazy(() => import('../pages/Lessons/SolveLesson')),
  verify: lazy(() => import('../pages/Lessons/VerifyLesson')),
  fractions: lazy(() => import('../pages/Lessons/FractionsLesson')),
};
const NotFound = lazy(() => import('../pages/NotFound'));

export function App() {
  return (
    <HashRouter>
      <RouteErrorBoundary>
        <Suspense
          fallback={
            <div className="route-loading" role="status">
              در حال آماده‌سازی مسیر…
            </div>
          }
        >
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="learning" element={<Learning />} />
              {topics.map((topic) => {
                const Lesson = lessonPages[topic.id];
                return <Route key={topic.id} path={`learning/${topic.id}`} element={<Lesson />} />;
              })}
              <Route path="world" element={<World />} />
              <Route path="game" element={<Game />} />
              <Route path="game/level/:levelId" element={<Level />} />
              <Route path="progress" element={<Progress />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </HashRouter>
  );
}
