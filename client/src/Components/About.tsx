import React from 'react'
 export default  function About() {
  //using this page to test syles, these colors ar fore dev puropses
  const colors = ["[#08415c]", "[#cc2936]", "[#ebbab9]", "[#388697]", "[#b5ffe1]"]
  //              Darkest Blue  Bright Red    Fade Red    Blue          cyan
  return (
    <div className='w-full flex flex-col justify-center content-center'>
      <button className='bg-[#cc2936] text-2xl font-bold Alegreya  rounded-xl text-black bg-opacity-80 p-1 shadow-md shadow-black mt-2 w-[10%] hover:bg-[#ebbab9]'>Students</button>

      <button className="bg-[#cc2936] hover:bg-[#cc2936] text-black font-bold py-2 bg-opacity-90 px-4 rounded-md shadow-md m-3 w-[10%]">
        Students
      </button>

      <h1 className='title-font font-bold text-3xl text-[#08415c] Hind'>TITLE OF THIS PAGE Goes Here</h1>
      <p className='Montserrat'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
  )
}

