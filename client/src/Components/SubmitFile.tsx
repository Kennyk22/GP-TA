import React from 'react'

function InputSubmitter({handleFileUpload}: {handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>} ) {
  return (
    <div className='flex justify-center w-full'>
      <input title='fileInput' type="file" onChange={(e)=>handleFileUpload(e)} className="" />
    </div>
  )
}

export default InputSubmitter