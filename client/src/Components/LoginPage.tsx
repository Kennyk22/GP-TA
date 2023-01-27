import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LoginPage() {



  

  const {
    loginWithRedirect,
    logout,
    isAuthenticated } = useAuth0()


  return (
    <div className='CPdarkGrey'>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl CPTextOrange">Hey Teacher, we hear you, this is your new TA</h1>
      <p className="leading-relaxed mt-4  CPTextYellow">You keep asking your principal for support, the workload is unmanageable, worry no more, forget about endless hours of repetitive marking with GP-TA</p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 onClick={() => loginWithRedirect() } className="text-gray-900 text-lg font-medium title-font mb-5">Log in</h2>
       <div className="relative mb-4">
        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
        <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <button onClick={ () => logout()} className="CPTextOrange CPblack border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">Logout</button>
      <p className="text-xs text-gray-500 mt-3"></p>
    </div>
  </div>
</section>
    </div>
  )
}

export default LoginPage