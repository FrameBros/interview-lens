import { useState, useRef } from "react";

// INTERFACES - Define the shape of our data
interface AudioRecorderProps {
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
  
  // STATE MANAGEMENT
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isProcessing: false,
    transcript: '',
    error: null,
    hasPermission: null
  });

  // REF TO STORE RECOGNITION INSTANCE
  // useRef persists the recognition object between renders
  // This is crucial - we need the same instance to call .stop() on
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // FUNCTION: START RECORDING
  function handleStartRecording() {
    console.log('🎤 Starting recording...');
    
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      const errorMsg = 'Speech recognition not supported in this browser';
      console.error('❌', errorMsg);
      setState(prev => ({ ...prev, error: errorMsg }));
      props.onError?.(errorMsg);
      return;
    }

    // Create new recognition instance
    const recognition = new SpeechRecognition();
    
    // CONFIGURATION SETTINGS
    recognition.continuous = true;        // Keep recording until manually stopped
    recognition.interimResults = false;   // Only final results (change to true for live transcription)
    recognition.lang = 'en-US';          // Language setting
    recognition.maxAlternatives = 1;     // How many alternative transcriptions to consider

    // EVENT HANDLER: When recording starts
    recognition.onstart = () => {
      console.log('✅ Recording started successfully');
      setState(prev => ({ 
        ...prev, 
        isRecording: true,     // Update UI state
        error: null,           // Clear any previous errors
        isProcessing: false    // Not processing yet
      }));
      props.onRecordingStart?.(); // Notify parent component
    };

    // EVENT HANDLER: When speech is recognized
    recognition.onresult = (event) => {
      console.log('📝 Speech recognition result received');
      console.log('Event results:', event.results);
      
      // Get the transcript from the last result
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript;
      const confidence = event.results[lastResultIndex][0].confidence;
      
      console.log(`Transcript: "${transcript}" (confidence: ${confidence})`);
      
      // Update state with transcript
      setState(prev => ({
        ...prev,
        transcript: transcript,
        isProcessing: false
      }));
      
      // Send transcript back to parent component
      props.onTranscriptComplete(transcript);
    };

    // EVENT HANDLER: When errors occur
    recognition.onerror = (event) => {
      console.error('❌ Speech recognition error:', event.error);
      console.error('Full error event:', event);
      
      let errorMsg = `Speech recognition error: ${event.error}`;
      
      // Provide more helpful error messages
      switch(event.error) {
        case 'not-allowed':
          errorMsg = 'Microphone access denied. Please allow microphone permissions.';
          break;
        case 'no-speech':
          errorMsg = 'No speech detected. Please try speaking louder.';
          break;
        case 'audio-capture':
          errorMsg = 'Audio capture failed. Check your microphone.';
          break;
        case 'network':
          errorMsg = 'Network error. Check your internet connection.';
          break;
      }
      
      setState(prev => ({ 
        ...prev, 
        error: errorMsg, 
        isRecording: false, 
        isProcessing: false 
      }));
      props.onError?.(errorMsg);
    };

    // EVENT HANDLER: When recording ends (auto-stop or manual)
    recognition.onend = () => {
      console.log('🛑 Recording ended');
      setState(prev => ({ 
        ...prev, 
        isRecording: false, 
        isProcessing: false 
      }));
      props.onRecordingStop?.();
      
      // Clear the reference since recording is done
      recognitionRef.current = null;
    };

    // Store recognition instance in ref so handleStopRecording can access it
    recognitionRef.current = recognition;
    
    // Start the recording
    try {
      recognition.start();
      console.log('🚀 Recognition.start() called');
    } catch (error) {
      console.error('❌ Error starting recognition:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to start recording. Please try again.' 
      }));
    }
  }

  // FUNCTION: STOP RECORDING
  function handleStopRecording() {
    console.log('🛑 Stopping recording...');
    
    if (recognitionRef.current) {
      try {
        // Manually stop the recognition
        recognitionRef.current.stop();
        console.log('✅ Recognition.stop() called');
        
        // Update UI immediately
        setState(prev => ({ 
          ...prev, 
          isProcessing: true  // Show processing state while finalizing
        }));
        
      } catch (error) {
        console.error('❌ Error stopping recognition:', error);
        setState(prev => ({ 
          ...prev, 
          error: 'Error stopping recording',
          isRecording: false 
        }));
      }
    } else {
      console.warn('⚠️ No recognition instance to stop');
      setState(prev => ({ ...prev, isRecording: false }));
    }
  }

  // DETERMINE WHICH BUTTON TO SHOW
  const getButtonContent = () => {
    if (state.isRecording) {
      return {
        text: 'Stop Recording',
        onClick: handleStopRecording,
        className: 'bg-red-500 text-white hover:bg-red-600',
        disabled: false
      };
    } else if (state.isProcessing) {
      return {
        text: 'Processing...',
        onClick: () => {}, // No action when processing
        className: 'bg-yellow-500 text-white cursor-not-allowed',
        disabled: true
      };
    } else {
      return {
        text: 'Start Recording',
        onClick: handleStartRecording,
        className: 'bg-green-500 text-white hover:bg-green-600 active:scale-95',
        disabled: false
      };
    }
  };

  const buttonConfig = getButtonContent();

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      
      {/* VISUAL RECORDING INDICATOR */}
      <div className="relative">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
          state.isRecording 
            ? 'bg-red-500 animate-pulse shadow-lg shadow-red-300' 
            : state.isProcessing
            ? 'bg-yellow-500 animate-spin'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}>
          <div className={`w-8 h-8 rounded-full ${
            state.isRecording ? 'bg-white' : 
            state.isProcessing ? 'bg-white' : 'bg-gray-500'
          }`}></div>
        </div>
        
        {/* Ripple effect when recording */}
        {state.isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
        )}
      </div>

      {/* RECORDING STATUS TEXT */}
      <div className="text-center">
        {state.isRecording && (
          <p className="text-red-600 font-medium">🎤 Recording... Click stop when finished</p>
        )}
        {state.isProcessing && (
          <p className="text-yellow-600 font-medium">⏳ Processing speech...</p>
        )}
        {!state.isRecording && !state.isProcessing && (
          <p className="text-gray-600">Click to start recording</p>
        )}
      </div>

      {/* DYNAMIC START/STOP BUTTON */}
      <button
        onClick={buttonConfig.onClick}
        disabled={buttonConfig.disabled}
        className={`px-6 py-2 rounded-full font-medium transition-all ${buttonConfig.className}`}
      >
        {buttonConfig.text}
      </button>

      {/* ERROR DISPLAY */}
      {state.error && (
        <div className="w-full p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">❌ {state.error}</p>
        </div>
      )}

      {/* TRANSCRIPT DISPLAY */}
      {state.transcript && (
        <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Transcript:</h3>
          <p className="text-blue-700 italic">`{state.transcript}`</p>
        </div>
      )}
    </div>
  );
}