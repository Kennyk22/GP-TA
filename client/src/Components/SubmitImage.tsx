import React from 'react'


function SubmitImage({handleFileUpload}: {handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>} ) {
var formData = new FormData();
// formData.append('image', $('#YOUR_IMAGE_FILE')[0].files[0]);
$.ajax({
    method: 'POST',
    url: 'https://api.api-ninjas.com/v1/imagetotext',
    data: formData,
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    }
});



  return (
    <div className='flex justify-center w-full'>
      <input title='fileInput' type="file" onChange={(e)=>handleFileUpload(e)} className="" />
    </div>
  )
}

export default SubmitImage