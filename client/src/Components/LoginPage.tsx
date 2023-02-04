import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LoginPage() {

  const { loginWithRedirect } = useAuth0()


  return (
    <div className='bg-[#388697]'>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-[#08415c]">Hey Teacher, we hear you, this is your new TA</h1>
      <p className="leading-relaxed mt-4  text-[#ebbab9]">You keep asking your principal for support, the workload is unmanageable, worry no more, forget about endless hours of repetitive marking with GP-TA</p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <button onClick={() => loginWithRedirect() }  className="text-[#ebbab9] CPblack border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">Log in/Register</button>
      <p className="text-xs text-gray-500 mt-3"></p>
    </div>
  </div>
</section>
    </div>
  )
}

export default LoginPage