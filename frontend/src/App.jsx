import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoute';

import Home from './pages/Home';
import Library from './pages/Library';
import Admin from './pages/Admin';
import DefaultPage from './utils/DefaultPage';
import Authentication from './pages/Authentication';

const isAuthenticated = false;
const isAdmin = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Authentication />} exact/>
        <Route element={<DefaultPage />}>
          <Route path='/' element={<Home />}/>
          <Route path='/library' element={<Library />} exact/>
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/admin' element={<Admin />} exact/>
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
