import { useState } from "react";

// DONE: Add the missing onerror handler and console.log statements to handleOnRecord function
// TODO: Configure speech recognition settings (continuous, interimResults, lang, maxAlternatives)
// TODO: Test the updated function and check browser console for error messages
// TODO: Check common issues:
//    - Browser compatibility (Chrome/Edge work best, Firefox doesn't support)
//    - Microphone permissions granted
//    - HTTPS requirement (localhost should be fine)
//    - Silent periods causing auto-stop
// TODO: If still not working, try setting recognition.continuous = true for longer recording
// TODO: Once working, integrate transcript results with Supabase database storage
// TODO: Add visual feedback improvements (loading states, better error messages)
// TODO: Test with different speech patterns and background noise
// TODO: Debug console output, fix speech recognition, then move to database integration

{/* Creating all of the interfaces to be used on the function*/}  
interface  AudioRecorderProps {
    onTranscriptComplete: (transcript: string) => void;

    onRecordingStart?: () => void;
    onRecordingStop?: () => void;
    onError?: (error: string) => void;
  
    isLoading?: boolean;
  }

  interface AudioRecorderState {
    isRecording: boolean;
    isProcessing: boolean;
    transcript: string;
    error: string | null;
    hasPermission: boolean | null;
  }

  



export default function AudioRecorder(props: AudioRecorderProps) {

  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isProcessing: false,
    transcript: '',
    error: null,
    hasPermission: null
  }); 

  


{/**Creating  the actual connection of browser API (if it does not work use npm install --save @types/dom-speech-recognition) */}


  function handleOnRecord() {

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const errorMsg = 'Speech recognition not supported in this browser';
      setState(prev => ({ ...prev, error: errorMsg }));
      props.onError?.(errorMsg);
      return;
    }

    const recognition = new SpeechRecognition();
      //configurations so that the instance is able to work on the browser
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

     recognition.onstart = () => {
      setState(prev => ({ 
        ...prev, 
        isRecording: true, 
        error: null 
      }));
      props.onRecordingStart?.();
    };

     recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      
      // Store the transcription result in state
      setState(prev => ({
        ...prev,
        transcript: transcript,
        isRecording: false,
        isProcessing: false
      }));
      
      // Send transcript back to parent (for Supabase storage later)
      props.onTranscriptComplete(transcript);
      props.onRecordingStop?.();
    };

    recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
  console.error('Full error event:', event);
  
  const errorMsg = `Speech recognition error: ${event.error}`;
  setState(prev => ({ ...prev, error: errorMsg, isRecording: false, isProcessing: false }));
  props.onError?.(errorMsg);
};

    // When recording ends
    recognition.onend = () => {
      setState(prev => ({ 
        ...prev, 
        isRecording: false, 
        isProcessing: false 
      }));
    };
      recognition.start();


}


return (
  <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
    
    {/* Visual Recording Indicator */}
    <div className="relative">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
        state.isRecording 
          ? 'bg-red-500 animate-pulse shadow-lg shadow-red-300' 
          : 'bg-gray-200 hover:bg-gray-300'
      }`}>
        <div className={`w-8 h-8 rounded-full ${
          state.isRecording ? 'bg-white' : 'bg-gray-500'
        }`}></div>
      </div>
      
      {/* Ripple effect when recording */}
      {state.isRecording && (
        <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
      )}
    </div>

    {/* Recording Status Text */}
    <div className="text-center">
      {state.isRecording && (
        <p className="text-red-600 font-medium">🎤 Recording...</p>
      )}
      {state.isProcessing && (
        <p className="text-blue-600 font-medium">Processing speech...</p>
      )}
      {!state.isRecording && !state.isProcessing && (
        <p className="text-gray-600">Click to start recording</p>
      )}
    </div>

    {/* Control Button */}
    <button
      onClick={handleOnRecord}
      disabled={state.isRecording || state.isProcessing}
      className={`px-6 py-2 rounded-full font-medium transition-all ${
        state.isRecording || state.isProcessing
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
      }`}
    >
      {state.isRecording ? 'Recording...' : 'Start Recording'}
    </button>

    {/* Error Display */}
    {state.error && (
      <div className="w-full p-3 bg-red-100 border border-red-300 rounded-lg">
        <p className="text-red-700 text-sm">❌ {state.error}</p>
      </div>
    )}

    {/* Transcript Display */}
    {state.transcript && (
      <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Transcript:</h3>
        <p className="text-blue-700 italic">`{state.transcript}`</p>
      </div>
    )}
  </div>
);

}