import React from 'react'
import { GiRainbowStar } from 'react-icons/gi'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './About'
import LoginPage from './LoginPage'
import Pricing from './Payments/Pricing'
import Dashboard from './Dashboard'
import { useAuth0 } from '@auth0/auth0-react'


function Header() {

  const {logout, isAuthenticated} = useAuth0()
  return (
<header className="text-white body-font w-full h-30 rounded drop-shadow-lg bg-gray-400">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
     <Link to="/"> <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-20 h-20 text-black p-1 bg-[#cc2936] rounded-full" viewBox="0 -2 13 19">
            <GiRainbowStar />
          </svg></Link>
      <span className="text-white text-xl font-bold py-2 px-4 hover:text-black cursor-pointer transition duration-200 ease-in-out">GP-TA</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
     <Link to="/about"><a className="text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-200 ease-in-out">About</a></Link>
      <Link to="/pricing"><a className="text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-200 ease-in-out mr-5">Pricing</a></Link>

    </nav>
        {isAuthenticated ? <button onClick={() => logout() } className="inline-flex items-center bg-[#cc2936] text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-700 hover:text-white rounded text-base mt-4 md:mt-0">Log out
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button> : null}
      </div>



</header>  )
}

export default Header