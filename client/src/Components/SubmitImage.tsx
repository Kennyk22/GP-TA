import React from 'react'
import Tesseract from 'tesseract.js'
import { useState } from 'react';

function SubmitImage() {

  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  const handleChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
    console.log(image)
  }

  const handleImageToText = async () => {
    Tesseract.recognize(image, "eng").then((res) => {
      setText(res.data.text)
    })
      .catch(err) => {
    console.error(err)
  }
  }


  return (
    <div className='flex justify-center w-full'>
      <input title='fileInput' type="file" onChange={handleChange} />

      <button onClick={handleImageToText}>converToText</button>
      <p>{text}</p>
    </div>
  )
}

export default SubmitImage