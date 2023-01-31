import React from "react";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-black-500 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(!showModal)}
      >
        add new student
      </button>
      {showModal ? (
        <>
      <div className="w-2 bg-transparent rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5"></h2>
      <div className="relative mb-4">
        <label htmlFor="full-name" className="leading-7 text-sm text-white">Student's name</label>
        <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-white">Class</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-yellow-400 hover:text-black rounded text-lg">Add new student</button>
    </div>
        </>
      ) : null}
    </>
  );
}