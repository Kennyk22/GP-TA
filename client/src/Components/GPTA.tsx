import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function GPTA() {
  
  const {isAuthenticated, getAccessTokenSilently} = useAuth0()


  const authRequest = async () => {
    try {
      console.log(isAuthenticated)
      
      const unresponse = await fetch('http://localhost:3005/test')
      const text = await unresponse.json()
      console.log(text)
      const token = await getAccessTokenSilently()
      const response = await fetch('http://localhost:3005/testAuth', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      console.log(await response.json())
    } catch (error) {
      console.log(error)
    }
  }
  return (
<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Upload your file here
        <br className="hidden lg:inline-block"/>and have it marked in seconds
      </h1>
      <p className="mb-8 leading-relaxed">Import your document and get accurate notes </p>
          <div className="flex justify-center">
<input placeholder="insert text here" type="text" className="inline-flex text-black bg-gray border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded text-lg "/>
<br/>
  <button onClick={() => authRequest()} className="inline-flex m-2 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Check grammar</button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600/adadad/070708&text=el+coche+es+no+bonito+y+a+mi+gustar+mucho+las+palomitas.+La+casa+ser+grande+y+mi+gato+muy+travieso" />
          <p>List of all the mistakes in Spanish that your teaching assistant has found</p>
          <ul>
            <li>mistake</li>
            <li>mistake</li>
            <li>mistake</li>
            <li>mistake</li>
          </ul>
    </div>
  </div>
</section>  )
}

export default GPTA