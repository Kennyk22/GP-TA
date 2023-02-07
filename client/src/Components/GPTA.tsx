import React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import TeacherFolder from './TeacherFolder';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { addFeedback, deleteOneStudent, getAllData } from '../Services/services';
import {CircleLoader} from 'react-spinners'
import JSZip from 'jszip'
import SubmitFile from './SubmitFile';
import SubmitText from './SubmitText';
import DropDown from './DropDown';
import DropDownAssignment from './DropDownAssignment';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { WholeState } from '../Types/Types';
import { actionInputFile, actionInputText, actionInputImage, actionImage, actionFile, actionHighlight, actionList, actionLoading, actionAllStudents, actionAllAssignments, actionImgUrl, actionSuggestion } from '../Actions/actions';
//import SubmitImage from './SubmitImage';
import { createWorker } from 'tesseract.js';
import SubmitImage from './SubmitImage';


function GPTA() {

  const dispatch = useDispatch()
  const GPTAstate = useSelector((state: WholeState) => state.GPTA)
  const myRef = useRef() as React.MutableRefObject<HTMLInputElement>;


  const {isAuthenticated, getAccessTokenSilently, user} = useAuth0()

  useEffect(  ()=>{
    if (isAuthenticated) {
      getStudentsAndAssignments()
    }}, [isAuthenticated])

  //get AllDataForlists
  const getStudentsAndAssignments = async () => {
    const token: string = await getAccessTokenSilently()
    const data = await getAllData(token);
    dispatch(actionAllAssignments(data.titles))
    dispatch(actionAllStudents(data.students))
  }



  const checkGrammar = async (get?: string) => {
    const token = await getAccessTokenSilently()
    try {
      let postResult : { text: string}
      if (!get) {
        dispatch(actionLoading(true))
      //calls to server to get ai response then post that response on the database using the post request from services
        postResult = await addFeedback(GPTAstate.type === 'text' ? GPTAstate.input: GPTAstate.type === 'file' ?  GPTAstate.file : GPTAstate.image, token, GPTAstate.select.titleId as number, GPTAstate.select.studentId as number)
      } else {
        postResult = {text: get}
      }
      //then we can also display the result using the AIresponse
      const Results = postResult.text.split('-+-')
      const firstAnswer = Results[0]
      const secondAnswer = Results[1]
      const thirdAnswer = Results[2]
      dispatch(actionHighlight(formatAnswer(firstAnswer)))
      dispatch(actionList(formatText(secondAnswer.slice(0, secondAnswer.length-1))))
      dispatch(actionSuggestion(formatText(thirdAnswer.slice(0, thirdAnswer.length-1))))
      dispatch(actionLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(actionLoading(false))
    }
  }

  // changes the color of the mistakes to red
  function formatAnswer( text:string ) {
    const newtext = text.replace(/"\s"/g, " ")
    const newnewtext = newtext.replace(/\\n\\n/g, "")
    const regex = /\*+(.*?)\*+/g;
    const result = newnewtext.replace(regex, "<span class='$1' style='color: red;'><u>$1</u></span>");
    return result
  }


const formatText = (text:any) => {
    console.log(text)
    const errorList = text.split('\\n').slice(1);
    console.log('now as an array here', errorList)
    return errorList
}

  //input by text

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
// input by image

  const convertImageToText = async (image: File | null) => {
    if (!image) return;
    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(image);
    console.log(data, data.text)
    dispatch(actionImgUrl(URL.createObjectURL(image)))
    dispatch(actionImage(data.text))
  };


  const HoverAndHighlight = (word: string) => {
    const current: any = myRef.current
    const children: any = current.getElementsByClassName(word)
    for (const child of children) {
      child.style.backgroundColor = 'blue'
    }
  }

  const unhighlight = (word: string) => {
    const current: any = myRef.current
    const children: any = current.getElementsByClassName(word)
    for (const child of children) {
      child.style.backgroundColor = 'transparent'
    }
  }



  return (
    //whole dashboard
    <section ref={myRef} className="">
      {/* second header with dropdown menus */}
      <div className='justify-between flex shadow'>
        <p>{isAuthenticated ? <p className='border-red-700 border-2 text-black font-bold py-2 bg-opacity-90 px-4 rounded-md m-3 hover:bg-black hover:text-white ease-linear transition-all duration-150 cursor-pointer w-fit'>{user?.name}'s <span className=''>classroom</span></p> : <p>you are not logged in</p> }</p>
        {/* <Link to="/teacherFolder"><button className='bg-[#cc2936] hover:bg-[#cc2936] text-black font-bold py-2 bg-opacity-90 px-4 rounded-md shadow-md m-3 w-[60%]'>take me to teacher folder</button></Link> */}
        {/* <Link to="/teacherNotes"><button className='bg-[#cc2936] hover:bg-[#cc2936] text-black font-bold py-2 bg-opacity-90 px-4 rounded-md shadow-md m-3 w-[60%]'>take me to teacher Notes</button></Link> */}
        {/* <DropDown name = {'Assignments'} array= {GPTAstate.allStudents} checkGrammar={checkGrammar}/> */}
        <div className='mr-7 mt-1'>
        {GPTAstate.allAssignments ? <DropDownAssignment title={'assignments'} array={GPTAstate.allAssignments}  checkGrammar={checkGrammar} /> :  <p className="bg-red-700 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 ml-7 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150"
> loading assignments</p>}
        {GPTAstate.allStudents ? <DropDown name={'Students'} array={GPTAstate.allStudents} checkGrammar={checkGrammar} /> :  <p className="bg-red-700 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 ml-7 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150"
> loading students</p>}
        </div>
      </div>

      <section className="text-gray-800 body-font h-full">
      {GPTAstate.select.studentId !== null && GPTAstate.select.titleId !== null ? <div className="container mx-auto flex px-5 py-17 p-5 md:flex-row ">

       {/* //container of submission buttons */}

        <div className="lg:flex-grow md:w-1/2 lg:mr-1 lg:mt-10 md:mr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Upload your file here
            <br className="hidden lg:inline-block"/>and have it marked in seconds
          </h1>
          {/* <h1>Text here for development purposes</h1> */}
          {/* <p>Yo estudia en la escuela secundaria. Yo no gusto estudiar matematicas pero si me gusta jugar futbol. El fin de semana yo jugaba con mis amigos en el parque. Yo no tiene mucho tiempo libre porque yo tienes que hacer tareas mucho. Mi mama siempre dice que yo debo esforzarme mas. Yo trataré de hacerlo.</p> */}
          <div className="flex flex-row justify-around w-full">
            <button onClick={()=>dispatch(actionInputFile)} className="flex m-2 text-white bg-[#cc2936] border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded items-center text-lg">File</button>
            <button onClick={()=>dispatch(actionInputText)} className="flex m-2 text-white bg-[#cc2936] border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded items-center text-lg">Text</button>
            <button onClick={()=>dispatch(actionInputImage)} className="flex m-2 text-white bg-[#cc2936] border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded items-center text-lg">Image</button>
            <button onClick={() => checkGrammar()} className="flex m-2 text-white bg-[#020105] border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Check grammar</button>
          </div >
              {GPTAstate.type === 'text' ? <SubmitText /> : GPTAstate.type==='file' ? <SubmitFile handleFileUpload = {handleFileUpload}/> : <SubmitImage handleImageUpload = {convertImageToText}/>}
        </div>

        {/* container of the teacher feebdack */}

        <div className="lg:max-w-xl p-9 flex-col lg:w-full md:w-1/2 w-5/6 justify-center content-center">

          {!GPTAstate.loading ?
            <div>

            {/* first feedback */}
            <div className='feedbackWrap border-red-700 border-2  rounded-lg p-4 shadow-lg'>
             <h1 className="font-bold">Step 1: Spot your areas of improvement in your essay</h1>
              <p className='' dangerouslySetInnerHTML={{ __html: GPTAstate.highlightResult }}></p>
              </div>
              <br />

              {/* //second feedback */}
             <div className='feedbackWrap rounded-lg p-4 border-red-700 border-2 shadow-lg margin-'>
             <h1 className='font-bold'>Step 2: A list with feedback for your corrections above</h1>
             <ul>
              {GPTAstate.listResult.map((element: any, index) => {
                element = element.replace(/\\/g, '');
                return <li>{element}</li>
                // let mistakes = element.match(/\"\w+\"/g);
                // console.log('mistakes', mistakes)
                // if (!mistakes) return;
                // mistakes = mistakes.map((el: string) => el.replace(/\"/g, ''))
                // let [intro, solution] = element.split('should be')
                // console.log('element', element)
                // element = intro + `should be <span class='${'mistakes[1]'}' style='color: green'>" ${solution} "</span>`
                // return <li  key={index} onMouseLeave={() => unhighlight('mistakes[1])')} onMouseOver={() => HoverAndHighlight('mistakes[1]')}  dangerouslySetInnerHTML={{ __html: element }}></li>
              })}
              </ul>
                </div>

              {/* //third feedback */}
              <div className='feedbackWrap border-red-700 border-2 mt-6 rounded-lg p-4 shadow-lg'>
                <h1 className='font-bold'>Step 3: General suggestions to expand your learning</h1>
                <ul>
                  {GPTAstate.suggestionResult.map((element: any, index) => {
                  element = element.replace(/\\/g, '');
                  console.log(element)
                  return <li>{element}</li>})}
                </ul>
              </div>


            </div>  :
            <CircleLoader className="self-center top-30 left-30 items-center align-middle" color="red" />
          }
        </div>
      </div> :
       <div className='flex justify-center  items-center h-full w-full'>
        <p className="bg-red-700 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 ml-7 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150"
> Please select a student and an assignment</p>
       </div>
       }
      </section>
      </section>
  )
}

export default GPTA

