'use client'
import React from 'react'
import AudioRecorder from '@/components/features/webspeech'

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
   