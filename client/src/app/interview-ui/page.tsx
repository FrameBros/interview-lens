'use client'
import React from 'react'
import { useState } from 'react'




function page() {
    const [userAnswer,setUserAnswer] = useState("")
    const [AIResponse,setAIResponse] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUserAnswer(e.target.value)
    }

    const SERVER_LINK = "http://localhost:3000"

    //const [response, setResponse] = useState('')
    
    
    const getInterviewResponse = async () =>{
        try{
            const response = await fetch(SERVER_LINK+'/api/interviewer',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question:userAnswer})
                
            })
            const data = await response.json()
           console.log(data)

         

        }catch(error){
            console.log(error)
        }
    }



  return (
    <div>
        Text Input: <input
        style={{
        border: '1px solid black',
        borderRadius: '4px', 
        padding: '8px'       
    }}
        type="text"
        onChange={handleChange}
        
        
        />
        <button onClick={getInterviewResponse}
                style={{
        backgroundColor: '#0070f3', // Bright blue
        color: 'white', // White text
        padding: '10px 24px', // Top/bottom, left/right padding
        border: 'none', // Removes default border
        borderRadius: '6px', // Rounded corners
        fontSize: '16px', // Slightly larger font
        fontWeight: 'bold', // Bolder text
        cursor: 'pointer', // Cursor changes on hover
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)', // Subtle shadow
        transition: 'background 0.2s', // Smooth hover transition
}}> Submit Response </button>
       
        
        
        


    </div>
  )
}

export default page