import React from 'react'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import RecordView from '../components/audioRecorder.jsx'

const Test = (props) => {


    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };

  return (
    <div> <RecordView onRecordingComplete={addAudioElement} /> </div>
  )
}

export default Test