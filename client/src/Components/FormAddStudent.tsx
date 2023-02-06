import React from "react";
import { useState } from 'react'
import {addStudent} from '../Services/services'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { actionAllStudents } from "../Actions/actions";
import {Student} from "../Types/Types"

export default function FormAddStudent() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('')

const {getAccessTokenSilently} = useAuth0()

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently()
    const students = await addStudent(token, name)
    dispatch(actionAllStudents(students))
    setName('')
  }

  return (
    <>
      <button
        className="bg-red-700 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 ml-7 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(!showModal)}
      >
        add new student
      </button>
      {showModal ? (
        <>
      <div className="w-full bg-transparent rounded-lg p-8 flex flex-col md:ml-auto  mt-10 md:mt-0  ease-linear transition-all duration-150">
      <div className="relative mb-4">
        <label htmlFor="full-name" className="leading-7 text-sm text-white">Student's name</label>
        <input onChange={(e) =>setName(e.target.value) } value={name} type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-red-700 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>

        <button onClick={handleSubmit} className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-yellow-400 hover:text-black rounded text-lg">Add new student</button>
    </div>
        </>
      ) : null}
    </>
  );
}