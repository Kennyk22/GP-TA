import React from 'react'

function SubmitText({setInput} : {setInput: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <div className='w-full h-full'>
      <textarea placeholder="insert text here" onChange={e => setInput(e.target.value)} className="flex w-full h-max text-black bg-gray border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded text-lg " />
    </div>
  )
}

export default SubmitText