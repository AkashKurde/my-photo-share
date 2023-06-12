import React from 'react'
import Login from './views/Login'
import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './views/Upload';
import Header from './views/Header';
const App = () => {
  const username = 'John';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Header username={username} />
              <Home />
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              <Header username={username} />
              <Upload />
            </>
          }
        />
      </Routes>
    </Router>

  )
}

export default App


