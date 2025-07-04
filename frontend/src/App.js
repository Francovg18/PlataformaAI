import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import InstallButton from "./InstallButton";
const Home = lazy(() => import('./containers/pages/Home'));
const Error404 = lazy(() => import('./containers/errors/Error404'));
const Signup = lazy(() => import('./containers/auth/Signup'));
const Login = lazy(() => import('./containers/auth/Login'));
const Activate = lazy(() => import('./containers/auth/Activate'));
const ResetPassword = lazy(() => import('./containers/auth/ResetPassword'));
const ResetPasswordConfirm = lazy(() => import('./containers/auth/ResetPasswordConfirm'));
const Dashboard = lazy(() => import('./containers/pages/Dashboard'));
const MathLessonModule = lazy(() => import('./components/course/MathLessonModule'));
const MathAdventureGame = lazy(() => import('./components/miniGames/MathAdventureGame'));
function App() {
  return (
    <Provider store={store}>
      <Router>
        <InstallButton />
        <Suspense fallback={<div className="text-center mt-10">Cargando neuronas artificiales para ayudarte a aprender mejor...</div>}>
          <Routes>
            {/* General */}
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses/:id/start" element={<MathLessonModule />} />
            <Route path="/matematicas" element={<MathAdventureGame />} />

            {/* Error 404 */}
           
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
