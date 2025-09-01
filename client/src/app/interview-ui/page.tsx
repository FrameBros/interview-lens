'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { UUID } from 'crypto'


function page() {
    const SERVER_LINK = "http://localhost:3000"


    const [userAnswer, setUserAnswer] = useState("")
    const [AIResponse, setAIResponse] = useState("")
    const [loading,setLoading] = useState("")
    const [category,setCategory] = useState("leadership")


    
    const[question,setQuestion] = useState(null)


   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(e.target.value)
    }



   
    
    const getInterviewQuestion = async(category: any)=>{
        try{
            const {data} = await supabase.rpc('get_random_question', {
                category:category
            })
            console.log(data)
            console.log(data)
            return data[0]
        }catch(error){
            console.log(error)
            return null
        }
        
        
    }
    const setInterviewQuestion = async(category:any) =>{
        const question  = await getInterviewQuestion(category)
        setQuestion(question.question_text)


    }



    const submitAnswer = async () => {
        try {
            const response = await fetch(SERVER_LINK + '/api/interviewer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer: userAnswer, question: question})
            })
            const data = await response.json()
            
            setAIResponse(data)
          
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
    const fetchRandomQuestion = async () => {
        const questionData = await getInterviewQuestion(category)
        setQuestion(questionData.question_text)
    }
    fetchRandomQuestion()
}, []) // Empty array means this runs only once when component mounts

    const handleCategoryClick = async (category: any) => {
    console.log(category)
    const newQuestion = await getInterviewQuestion(category)
    setQuestion(newQuestion.question_text)
}


const buttonStyle = {
                    backgroundColor: '#0070f3',
                    color: 'white',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    transition: 'background 0.2s',
                    marginLeft: '10px'
}

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            Text Input: <input
                style={{
                    border: '1px solid black',
                    borderRadius: '4px', 
                    padding: '8px',
                    marginLeft: '10px',
                    width: '400px'
                }}
                type="text"
                onChange={handleChange}
            />
            <button onClick={setInterviewQuestion}> click for question</button>



            <button onClick={submitAnswer}
                style={buttonStyle}>
                Submit Response
            </button>

            {/* Display the current question */}
            {question && (
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    backgroundColor: '#e8f4f8',
                    border: '1px solid #0070f3',
                    borderRadius: '8px',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    <h3 style={{ 
                        color: '#0070f3', 
                        marginTop: '0',
                        marginBottom: '15px'
                    }}>
                        Interview Question:
                    </h3>
                    <p style={{
                        fontSize: '16px',
                        lineHeight: '1.5',
                        color: '#333',
                        margin: '0'
                    }}>
                        {question}
                    </p>
                </div>
            )}
       
            {/* Clean display for Gemini response */}
            {AIResponse && (
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    <h3 style={{ 
                        color: '#495057', 
                        marginTop: '0',
                        borderBottom: '2px solid #0070f3',
                        paddingBottom: '10px'
                    }}>
                        Interview Evaluation:
                    </h3>
                    <div style={{
                        lineHeight: '1.6',
                        fontSize: '14px',
                        color: '#343a40',
                        whiteSpace: 'pre-line'
                    }}>
                        {AIResponse}
                    </div>
                    
                </div>
            )}
        <button onClick={() => handleCategoryClick("failure")} style={buttonStyle}>Failure</button>
        <button onClick={() => handleCategoryClick("initiative")} style={buttonStyle}>Initiative</button>
        <button onClick={() => handleCategoryClick("leadership")} style={buttonStyle}>Leadership</button>
        <button onClick={() => handleCategoryClick("problem-solving")} style={buttonStyle}>Problem Solving</button>
        <button onClick={() => handleCategoryClick("decision-making")} style={buttonStyle}>Decision Making</button>
        <button onClick={() => handleCategoryClick("conflict")} style={buttonStyle}>Conflict</button>
        <button onClick={() => handleCategoryClick("adaptability")} style={buttonStyle}>Adaptability</button>
        <button onClick={() => handleCategoryClick("teamwork")} style={buttonStyle}>Teamwork</button>

        </div>
    )
}


export default page
