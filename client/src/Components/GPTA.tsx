import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import TeacherFolder from './TeacherFolder';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { addFeedback, deleteOneStudent } from '../Services/services';
import {CircleLoader} from 'react-spinners'
import JSZip from 'jszip'
import SubmitFile from './SubmitFile';
import SubmitText from './SubmitText';
import DropDown from './DropDown';
import DropDownAssignment from './DropDownAssignment';
import { getAllStudents, getAllAssignments } from '../Services/services';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { WholeState } from '../Types/Types';
import { actionInputFile, actionInputText, actionFile, actionHighlight, actionList, actionLoading, actionAllStudents, actionAllAssignments } from '../Actions/actions';


function GPTA() {

  const dispatch = useDispatch()
  const GPTAstate = useSelector((state: WholeState) => state.GPTA)
  const myRef = useRef() as React.MutableRefObject<HTMLInputElement>;


  const {isAuthenticated, getAccessTokenSilently, user} = useAuth0()

  useEffect(  ()=>{
    if (isAuthenticated) {
      getAllStudentsData()
    }}, [isAuthenticated])

  //getAllStudentData
    const getAllStudentsData = async () => {
    const token:string = await getAccessTokenSilently()
    const data = await getAllStudents(token);
      dispatch(actionAllStudents(data))

  //getAllAssignmentData
      const getAllAssignmentsData = async () => {
        const token: string = await getAccessTokenSilently()
        const data = await getAllAssignments(token);
        dispatch(actionAllAssignments(data))
    }
  }



  const checkGrammar = async (get?: string) => {
    const token = await getAccessTokenSilently()
    try {
      if (GPTAstate.select.studentId === null) return
      let postResult : { text: string}
      if (!get) {
        dispatch(actionLoading(true))
      //calls to server to get ai response then post that response on the database using the post request from services
        postResult = await addFeedback(GPTAstate.type ? GPTAstate.input : GPTAstate.file, token, 1, GPTAstate.select.studentId)
      } else {
        postResult = {text: get}
      }
      //then we can also display the result using the AIresponse
      const Results = postResult.text.split('-+-')
      const firstAnswer = Results[0]
      const secondAnswer = Results[1]
      dispatch(actionHighlight(formatAnswer(firstAnswer)))
      dispatch(actionList(formatText(secondAnswer)))
      dispatch(actionLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(actionLoading(false))
    }
  }

  // changes the color of the mistakes to red
  function formatAnswer( text:string ) {
    const regex = /\*(.*?)\*/g;
    text = text.slice(5)
    const result = text.replace(regex, "<span class='$1' style='color: red;'><u>$1</u></span>");
    return result
  }


const formatText = (text:any) => {
    const errorList = text.split('\\n').slice(2);
    return errorList
}

  const extractText = async (doc: File) => {
    const zip = await JSZip.loadAsync(doc)
    const xml = await zip.file("word/document.xml")?.async("text")
    if (!xml) return
    const matchedxml = xml.match(/<w:t(.*?)>(.*?)<\/w:t>/g)?.join('').replace(/<w:t(.*?)>|<\/w:t>/g, "")
    return matchedxml
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files !== null ? event.target.files[0]: undefined
    if (!newFile) return
    const docText: any = await extractText(newFile)
    dispatch(actionFile(docText));
  }


  const HoverAndHighlight = (word: string) => {
    const current: any = myRef.current
    const children: any = current.getElementsByClassName(word)
    for (const child of children) {
      child.style.backgroundColor = 'blue'
    }
  }


  return (
    <section ref={myRef} className="text-gray-800 body-font">
      <div className='flex flex-row justify-around content-center'>
        <p>{isAuthenticated ? <p className='bg-[#cc2936] hover:bg-[#cc2936] text-black font-bold py-2 bg-opacity-90 px-4 rounded-md shadow-md m-3 w-[60%]'>{user?.name}</p> : <p>you are not logged in</p> }</p>
        <Link to="/teacherFolder"><button className='bg-[#cc2936] hover:bg-[#cc2936] text-black font-bold py-2 bg-opacity-90 px-4 rounded-md shadow-md m-3 w-[60%]'>take me to teacher folder</button></Link>
        <Link to="/teacherNotes"><button className='bg-[#cc2936] hover:bg-[#cc2936] text-black font-bold py-2 bg-opacity-90 px-4 rounded-md shadow-md m-3 w-[60%]'>take me to teacher Notes</button></Link>
        {/* <DropDown name = {'Assignments'} array= {GPTAstate.allStudents} checkGrammar={checkGrammar}/> */}
        {GPTAstate.allStudents ? <DropDownAssignment name={'assignments'} array={GPTAstate.allAssignments} checkGrammar={checkGrammar} /> : 'loading assignments'}

        {GPTAstate.allStudents ? <DropDown name={'Students'} array={GPTAstate.allStudents} checkGrammar={checkGrammar} /> : 'loading students'}
      </div>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:mr-24 md:mr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Upload your file here
            <br className="hidden lg:inline-block"/>and have it marked in seconds
          </h1>
          <p className="mb-8 leading-relaxed">Import your document and get accurate notes </p>
          <h1>Text here for development purposes</h1>
          <p>Yo estudia en la escuela secundaria. Yo no gusto estudiar matematicas pero si me gusta jugar futbol. El fin de semana yo jugaba con mis amigos en el parque. Yo no tiene mucho tiempo libre porque yo tienes que hacer tareas mucho. Mi mama siempre dice que yo debo esforzarme mas. Yo trataré de hacerlo.</p>
          <div className="flex flex-row justify-around w-full">
            <button onClick={()=>dispatch(actionInputFile)} className="flex m-2 text-white bg-[#cc2936] border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Input By File</button>
            <button onClick={()=>dispatch(actionInputText)} className="flex m-2 text-white bg-[#cc2936] border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Input By Text</button>
            <button onClick={() => checkGrammar()} className="flex m-2 text-white bg-[#cc2936] border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Check grammar</button>
          </div >
              {GPTAstate.type ? <SubmitText /> : <SubmitFile handleFileUpload = {handleFileUpload}/>}
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 justify-center content-center">
            <p>List of all the mistakes in Spanish that your teaching assistant has found</p>
          {!GPTAstate.loading ?
            <ul>
              <li dangerouslySetInnerHTML={{ __html: GPTAstate.highlightResult }}></li>
              <br />
              <h1><b>Here is your feedback</b></h1>
              <br />
              {GPTAstate.listResult.map((element: any, index) => {
                element = element.replace(/\\/g, '');
                let mistakes = element.match(/\"\w+\"/g);
                if (!mistakes) return;
                mistakes = mistakes.map((el: string) => el.replace(/\"/g, ''))
                let [intro, solution] = element.split('should be')
                element = intro + `should be <span class='${mistakes[1]}' style='color: green'>" ${solution} "</span>`
                return <li key={index} onMouseOver={() => HoverAndHighlight(mistakes[1])} dangerouslySetInnerHTML={{ __html: element }}></li>
              })}
            </ul> :
            <CircleLoader color="#5f5f5f" />
          }
        </div>
      </div>
    </section>
  )
}

export default GPTA

