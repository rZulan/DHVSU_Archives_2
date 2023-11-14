import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoute';

import Home from './pages/Home';
import Library from './pages/Library';
import Admin from './pages/Admin';
import DefaultPage from './utils/DefaultPage';
import Authentication from './pages/Authentication';
import { AuthProvider } from './context/AuthContext';
import Submit from './pages/Submit';
import Profile from './pages/profile';

const isAuthenticated = false;
const isAdmin = true;

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Authentication />} exact />
          <Route element={<DefaultPage />}>
            <Route path='/' element={<Home />} />
            <Route path='/library' element={<Library />} exact />
            <Route path='/submit' element={<Submit />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/admin' element={<Admin />} exact />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
