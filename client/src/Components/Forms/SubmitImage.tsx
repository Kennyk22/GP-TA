

import React from 'react'
import { useSelector } from 'react-redux'
import { WholeState } from '../../Types/Types'

function SubmitImage({handleImageUpload}: {handleImageUpload: (image: File | null) => Promise<void>} ) {
    const imgState = useSelector((state: WholeState) => state.GPTA.imgURL)
  return (
    <div className='flex flex-col justify-center items-center w-full'>

      <input title='fileInput' id='image' type="file" onChange={(e)=>handleImageUpload(e.target.files ? e.target.files[0] : null)} className="imgInput" />
      {imgState.length > 0 ? <img className="rounded-lg opacity-90" src={imgState} alt='' /> : null}
    </div>
  )
}

export default SubmitImage