import React from 'react'
import Login from './views/Login'
import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './views/Upload';
import Header from './views/Header';
import PrivateRoute from './views/PrivateRoute';
import { useSelector } from 'react-redux';
import AdminPage from './views/Admin/AdminPage';

const App = () => {
  const back = true;
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Header/>
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
              <Header/>
              <AdminPage/>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

