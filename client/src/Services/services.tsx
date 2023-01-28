const baseURL = 'http://localhost:3005'


const addFeedback = async (feedbackText:string, token:string) => {
    try {
    return await fetch(`${baseURL}/addFeedback`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            authorization : `Bearer ${token}`
        },
        body: JSON.stringify({content: feedbackText})
    }).then(async response => {
        const result = await response.json()
        console.log('this is the response.json', result)
        return result
   })
    } catch (error) {
      console.error(error);
      return 'error'
    }
}


export {addFeedback }