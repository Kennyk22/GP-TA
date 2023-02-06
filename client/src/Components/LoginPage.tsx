import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LoginPage() {

  const { loginWithRedirect } = useAuth0()


  return (
  <div className='h-[78.8%]'>
  <section className="text-gray-600 body-font h-full ">
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center h-1/2 bg-[#626262]">
      <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 className="title-font font-medium text-3xl text-[#ffffff]">Hey Teacher, we hear you, this is your new TA</h1>
        <p className="leading-relaxed mt-4  text-[#ffffff]">You keep asking your principal for support, the workload is unmanageable, worry no more, forget about endless hours of repetitive marking with GP-TA</p>
      </div>
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <button onClick={() => loginWithRedirect() }  className="text-[#ffffff] CPblack border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">Log in/Register</button>
        <p className="text-xs text-gray-500 mt-3"></p>
      </div>
    </div>
    <div className='container px-5 text-[#b5b5b5] h-1/2 overflow-auto scrollstep'>
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex flex-wrap">
      <div className="flex flex-wrap w-full">
        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
              <p className="leading-relaxed">Upload you students' work by Docx, Image, or raw text to our AI assistant.</p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
              <p className="leading-relaxed">First we give you highlighted sections to let you know where the errors are</p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="3"></circle>
                <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 3</h2>
              <p className="leading-relaxed">You get A list of errors, and possible corrections to give back to your students</p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 4</h2>
              <p className="leading-relaxed">Generarl feedback with examples is generated to give your students the tools to improve their work</p>
            </div>
          </div>
          <div className="flex relative">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
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
        <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src="https://dummyimage.com/1200x500" alt="step"/>
      </div>
    </div>
  </section>
  </div>
</section>

    </div>
  )
}

export default LoginPage