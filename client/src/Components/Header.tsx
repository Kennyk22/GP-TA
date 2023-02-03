import React from 'react'
import { GiRainbowStar } from 'react-icons/gi'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './About'
import LoginPage from './LoginPage'
import Pricing from './Payments/Pricing'
import Dashboard from './Dashboard'
import { useAuth0 } from '@auth0/auth0-react'


function Header() {
  const {logout} = useAuth0()
  return (
<header className="text-white body-font bg-[#08415c]">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
     <Link to="/"> <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-20 h-20 text-black p-1 bg-[#cc2936] rounded-full" viewBox="0 -2 13 19">
            <GiRainbowStar />
          </svg></Link>
      <span className="ml-3 text-xl">GP-TA</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
     <Link to="/about"><a className="mr-5 hover:text-[#ebbab9]">About</a></Link>
      <Link to="/pricing"><a className="mr-5 hover:text-[#ebbab9]">Pricing</a></Link>

    </nav>
        <button onClick={() => logout() } className="inline-flex items-center bg-[#cc2936] text-white border-0 py-1 px-3 focus:outline-none hover:bg-[#ebbab9] hover:text-[#08415c] rounded text-base mt-4 md:mt-0">Log out
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
      </div>



</header>  )
}

export default Header