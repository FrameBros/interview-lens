'use client'
import React from 'react'
import AudioRecorder from '@/components/features/webspeech'

//TODO: possibly add a column to track webspeechapi confidence for user sessions so we can take that into account
// when training the model, since if we get a session with poor confidence, the data will not be as good
//since it could not interpret the audio as well as it should have.

export default function Webspeech() {

  const handleTranscript = (transcript: string) => {
    console.log("User said:", transcript);
    // Later you'll save this to Supabase here
  }


  return (
<div className = "flex items-center text-xl">

    <h1>THIS IS A TEST :P</h1>
    <AudioRecorder
    onTranscriptComplete={handleTranscript}
    />

   </div>


  )

}
   