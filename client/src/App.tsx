import React from 'react';
import './App.css';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div>
      <Header />
      <LoginPage />
       <Dashboard/>

    </div>
  );
}

export default App;
