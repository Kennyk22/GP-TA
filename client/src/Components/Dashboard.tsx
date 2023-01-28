import React from 'react'
import GPTA from './GPTA'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeacherFolder from './TeacherFolder';
import TeacherNotes from './TeacherNotes';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './LoginPage';

function Dashboard() {

  const{isAuthenticated} = useAuth0()

  return (
    <div>
      <GPTA />
      <Routes>
      <Route path="/teacherFolder" element={isAuthenticated ? <TeacherFolder /> : <LoginPage/>} />
        <Route path="/teacherNotes" element={isAuthenticated ? <TeacherNotes /> : <LoginPage />}/>
      </Routes>
    </div>
  )
}

export default Dashboard