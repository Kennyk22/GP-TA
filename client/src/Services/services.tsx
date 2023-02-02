const baseURL = 'http://localhost:3005'


const addFeedback = async (feedbackText:string, token:string, titleId: number, studentId: number) => {
    try {
    return await fetch(`${baseURL}/addFeedback`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            authorization : `Bearer ${token}`
        },
        body: JSON.stringify({content: feedbackText, titleId: titleId, studentId: studentId})
    }).then(async response => {
        const result = await response.json()
        return result
   })
    } catch (error) {
      console.error(error);
      return 'error'
    }
}

const getFeedback = async (token:string, titleId: number, studentId: number) => {
    try {
    return await fetch(`${baseURL}/getFeedback/${titleId}/${studentId}`, {
        headers: {
            'Content-Type' : 'application/json',
            authorization : `Bearer ${token}`
        },
    }).then(async response => {
        const result = await response.json()
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
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then(async response => {
            const result = await response.json();
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
        return result
   })
    } catch (error) {
      console.error(error);
      return 'error'
    }

}


const addAssignment = async (token: String, title: String) => {
        try {
    return await fetch(`${baseURL}/addAssignment`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            authorization : `Bearer ${token}`
        },
        body: JSON.stringify({title: title})
    }).then(async response => {
        const result = await response.json()
        return result
   })
    } catch (error) {
      console.error(error);
      return 'error'
    }

  }

const deleteOneStudent = async (token: String, id: string) => {
    console.log('delete is happening')
    return fetch(`${baseURL}/student/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        },
    } )
    .then(response => response.json())
    .then(response => response)
  .catch(error => {
     return console.log(error, 'delete error')
  });
}

const deleteOneTitle = async (token: String, id: string) => {
    console.log('delete is happening')
    return fetch(`${baseURL}/assignment/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        },
    } )
    .then(response => response.json())
    .then(response => response)
  .catch(error => {
     return console.log(error, 'delete error')
  });
}

const getAllAssignments = async (token: String) => {
       try {
        return await fetch(`${baseURL}/assignment`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then(async response => {
            const result = await response.json();
            return result
})
    } catch (error) {
        console.log(error);
        return 'error'
       }



}

 const payments = async (plan:string) => {
     try {
         console.log('are you happening')
         return await fetch(`${baseURL}/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items:
        {plan: plan}
    }),
         })
     .then(async response => {
      const result = await response.json();
     return result
})
     } catch (error) {
         console.log(error)
}
 }



export {addFeedback, getAllStudents, addStudent, addAssignment, deleteOneStudent, getAllAssignments, getFeedback, payments, deleteOneTitle}
