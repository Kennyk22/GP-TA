import React from 'react';
import './App.css';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import LoginPage from './Components/LoginPage';
import { useAuth0 } from '@auth0/auth0-react';
import About from './Components/About';
import Pricing from './Components/Pricing';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  const {isAuthenticated}= useAuth0()

  return (
    <div className='flex flex-col'>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={isAuthenticated ?
             <Dashboard/> :
             <LoginPage />
             }/>
          <Route path="/about" element={<About/>}/>
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
