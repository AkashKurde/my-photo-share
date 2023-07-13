import React, { useEffect } from 'react'
import Login from './views/Login'
import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Upload from './views/Upload';
import Header from './views/Header';
import PrivateRoute from './views/PrivateRoute';
import { useSelector } from 'react-redux';
import AdminPage from './views/Admin/AdminPage';
import NotFound from './views/NotFound';

const App = () => {
  const back = true;
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
  const user = useSelector(state => state.auth.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='*' element={<NotFound />}/>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Header />
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Header back={back} />
              <Upload />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {user && user.empId === 'SI006423' ?
                <>
                  <Header />
                  <AdminPage />
                </>
                :
                <NotFound />
              }
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;

