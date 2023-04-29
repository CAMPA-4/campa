import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const RecordView = (props) => {
    const {
    //   status,
    //   startRecording,
    //   stopRecording,
    //   mediaBlobUrl,
    //   clearBlobUrl
        startRecording,
        stopRecording,
        togglePauseResume,
        recordingBlob,
        isRecording,
        isPaused,
        recordingTime,
    } = useAudioRecorder();

    const [url, setUrl] = useState(recordingBlob);

    const resetRecording = () => {
      console.log("clicked");
      // setUrl(clearBlobUrl);
      clearBlobUrl();
    };
    

    // async function submitRecording (file) {
    //     try {
    //         await fetch('/', { file }, {
    
    //         });
    //         setUr();
    //     } catch (err){
    //     console.error(err.message);
    //     }
    // }

    return(
            <div>
                <p>status: {status}</p>
                <audio src = {recordingBlob} autoplay loop controls></audio>
                <button onClick = {startRecording}> Start Recording</button>
                <button onClick = {stopRecording}> Stop Recording and Submit</button>
            </div>
        )
}

export default RecordView;