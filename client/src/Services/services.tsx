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



const getAllStudents = async (token:string) => {
    try {
        return await fetch(`${baseURL}/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then(async response => {
            const result = await response.json();
            console.log('response json all students', result);
            return result
})
    } catch (error) {
        console.log(error);
        return 'error'
    }
}


const addStudent = async (token: String, name: String) => {
    try {
     return await fetch(`${baseURL}/addStudent`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            authorization : `Bearer ${token}`
        },
        body: JSON.stringify({name: name})
    }).then(async response => {
        const result = await response.json()
        console.log('this is the add student response.json', result)
        return result
   })
    } catch (error) {
      console.error(error);
      return 'error'
    }

}



    const addAssignment = async (token:String, title: String) => {
        try {
    return await fetch(`${baseURL}/addStudent`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            authorization : `Bearer ${token}`
        },
        body: JSON.stringify({title: title })
    }).then(async response => {
        const result = await response.json()
        console.log('this is the add student response.json', result)
        return result
   })
    } catch (error) {
      console.error(error);
      return 'error'
    }

}

export {addFeedback, getAllStudents, addStudent, addAssignment}