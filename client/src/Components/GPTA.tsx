import React from 'react'
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { OpenAIApi, Configuration } from 'openai'
import TeacherFolder from './TeacherFolder';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { addFeedback } from '../Services/services';
import {CircleLoader} from 'react-spinners'

function GPTA() {

  const [file, setFile] = useState()
  const [highlightResult, setHighlightResult] = useState("");
  const [listResult, setListResult] = useState<JSX.Element[]>([])
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);


  const {isAuthenticated, getAccessTokenSilently} = useAuth0()

  const checkGrammar = async () => {

    const token = await getAccessTokenSilently()
    try {
      setLoading(true)
      //calls to server to get ai response then post that response on the database using the post request from services
      const postResult = await addFeedback(input, token)
      //then we can also display the result using the AIresponse
      const Results = postResult.text.split('-+-')
      const firstAnswer = Results[0]
      const secondAnswer = Results[1]
      setHighlightResult(formatAnswer(firstAnswer))
      setListResult(formatText(secondAnswer))
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // changes the color of the mistakes to red
  function formatAnswer( text:string ) {
    const regex = /\*(.*?)\*/g;
    const result = text.replace(regex, "<span style='color: red;'>$1</span>");
    return result
  }

const formatText = (text:string) => {
    let lines = text.split("\n");
    let result:JSX.Element[] = [];
    lines.forEach(line => {
      let [bullet, arrow] = line.split("->");
      let newLine = <>{bullet}<span style={{ color: "green" }}>{arrow}</span></>;
      result.push(newLine);
      result = result[0].props.children[0].split("\n")
      console.log("this is my result", result)
    });
    return result
  }


  return (
    <section className="text-gray-600 body-font">
      <p>{isAuthenticated ? <p>you are logged in</p> : <p>you are not logged in</p> }</p>
  <Link to="/teacherFolder"><button className='bg-white m-1'>take me to teacher folder</button></Link><br />
  <Link to="/teacherNotes"><button className='bg-white'>take me to teacher Notes</button></Link>
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Upload your file here
        <br className="hidden lg:inline-block"/>and have it marked in seconds
      </h1>
      <p className="mb-8 leading-relaxed">Import your document and get accurate notes </p>
          <div className="flex justify-center">
          <form action="submit">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
          </form>
<textarea placeholder="insert text here" onChange={e=>setInput(e.target.value)} className="inline-flex text-black bg-gray border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded text-lg "/>
<br/>
            <button onClick={() => checkGrammar()} className="inline-flex m-2 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Check grammar</button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <p>List of all the mistakes in Spanish that your teaching assistant has found</p>
          { !loading ?
            <ul>
              <li dangerouslySetInnerHTML={{ __html: highlightResult }}></li>
              {listResult.map((element) => <li dangerouslySetInnerHTML={{ __html: JSON.stringify(element) }}></li>)}
          </ul> :
          <CircleLoader color="#5f5f5f" />
          }
    </div>
  </div>
</section>  )
}

export default GPTA


  //const authRequest = async () => {
  //   try {
  //     console.log(isAuthenticated)

  //     const unresponse = await fetch('http://localhost:3005/test')
  //     const text = await unresponse.json()
  //     console.log(text)
  //     const token = await getAccessTokenSilently()
  //     const response = await fetch('http://localhost:3005/testAuth', {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //     console.log(await response.json())
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }