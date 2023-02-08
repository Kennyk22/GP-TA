import React from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import LoginPage from './Components/LoginPage';
import { useAuth0 } from '@auth0/auth0-react';
import About from './Components/About';
import Pricing from './Components/Payments/Pricing';
import Completion from './Components/Payments/Completion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  const {isAuthenticated}= useAuth0()

  return (
      <Router>
      <Header />
     <div className='flex flex-col h-full w-full'>
        <Routes>
          <Route path="/" element={isAuthenticated ?
             <Dashboard/> :
             <LoginPage />
             }/>
          <Route path="/about" element={<About/>}/>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/completion" element={<Completion/>}/>
        </Routes>
       
        </div>
        <Footer />
      </Router>
  );
}

export default App;
