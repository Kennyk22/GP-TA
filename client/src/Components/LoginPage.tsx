import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import sample from '../images/GoodLoginPage.png'

function LoginPage() {

  const { loginWithRedirect } = useAuth0()


  return (

    //main container
  <div className='w-100%'>

      {/* //first block with login button  */}
   <section className="text-gray-600 h-60 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-bold text-3xl text-gray-900">Hey Teacher, we hear you, this is your new TA</h1>
      <p className="leading-relaxed mt-4 font-medium">You keep asking your principal for support, the workload is unmanageable, worry no more, forget about endless hours of repetitive marking with GP-TA</p>
          </div>

   <div className='bg-gray-400 rounded flex ml-20 items-center justify-center'>
  <button onClick={() => loginWithRedirect() } className="bg-black text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 m-5 rounded shadow hover:shadow-lg outline-none focus:outline-none hover:px-8 hover:py-8  ease-linear transition-all duration-150"
   >Log in / Register</button>
    </div>
  </div>
      </section>

      {/* //second block with steps */}

   <section className="text-gray-600 body-font">
    <div className="container px-5 py-9 mx-auto flex flex-wrap">
      <div className="flex flex-wrap w-full">
        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black inline-flex items-center justify-center text-red-700 relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">START</h2>
              <p className="leading-relaxed">Upload you students' work by Docx, Image, or raw text to our AI assistant.</p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black inline-flex items-center justify-center text-red-700 relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                 <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
              <p className="leading-relaxed">First we give you highlighted sections to let you know where the errors are</p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black inline-flex items-center justify-center text-red-700 relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
              <p className="leading-relaxed">You get a list of errors, and possible corrections to give back to your students</p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black inline-flex items-center justify-center text-red-700 relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 3</h2>
              <p className="leading-relaxed">General feedback with examples is generated to give your students the tools to improve their work</p>
            </div>
          </div>
          <div className="flex relative">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black inline-flex items-center justify-center text-red-700 relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">FINISH</h2>
              <p className="leading-relaxed">Your students get their work back graded promptly and you get to enjoy your day off!</p>
            </div>
          </div>
        </div>
        <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src={sample} alt="step"/>
      </div>
    </div>
  </section>

    </div>
  )
}

export default LoginPage