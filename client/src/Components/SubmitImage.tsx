
// import React from 'react'
// import {createWorker} from 'tesseract.js'
// import { useState, useCallback, useEffect } from 'react';

// function SubmitImage() {

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [textResult, setTextResult] = useState("");

//   const worker = createWorker();

//   const convertImageToText = useCallback(async () => {
//     if(!selectedImage) return;
//     await worker.load();
//     await worker.loadLanguage("eng");
//     await worker.initialize("eng");
//     const { data } = await worker.recognize(selectedImage);
//     setTextResult(data.text);
//   }, [worker, selectedImage]);

//   useEffect(() => {
//     convertImageToText();
//   }, [selectedImage, convertImageToText])

//   const handleChangeImage = e => {
//     if(e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//     } else {
//       setSelectedImage(null);
//       setTextResult("")
//     }
//   }

//   return (
//     <div className='flex justify-center w-full'>
//     <h1>ImText</h1>
//       <p>Gets words in image!</p>
//       <div className="input-wrapper">
//         <label htmlFor="upload">Upload Image</label>
//         <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
//       </div>

//       <div>
//           {textResult && (
//           <div className="box-p">
//             <p>{textResult}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default SubmitImage

import React from 'react'
import { useSelector } from 'react-redux'
import { WholeState } from '../Types/Types'


function SubmitImage({handleImageUpload}: {handleImageUpload: (image: File | null) => Promise<void>} ) {
    const imgState = useSelector((state: WholeState) => state.GPTA.imgURL)
  return (
    <div className='flex justify-center w-full'>
      <input title='fileInput' id='image' type="file" onChange={(e)=>handleImageUpload(e.target.files ? e.target.files[0] : null)} className="" />
      {imgState.length > 0 ? <img src={imgState} alt='' /> : null}
    </div>
  )
}

export default SubmitImage