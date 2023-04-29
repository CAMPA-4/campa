import { useReactMediaRecorder } from "react-media-recorder";
import React, { useState } from "react";

const RecordView = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder(
    {
        audio: true
        // blobPropertyBag: {type: "audio/mp3" 
    }
);

  const [url, setUrl] = useState(mediaBlobUrl);
  console.log("the url", mediaBlobUrl)
  const resetRecording = () => {
    console.log("clicked");
    // setUrl(clearBlobUrl);
    clearBlobUrl();
  };


  const afterstopRecording = async () => {
    try {
    const audioBlob = await fetch(mediaBlobUrl);
    console.log("we made audioblob");

    const newBlob = audioBlob.blob();
    console.log("we made newBlog");

    const audioFile = new File([newBlob], 'voice.wav', { type: 'audio/wav' });
  
    const audioForm = new FormData();
    audioForm.append('file', audioFile);
    console.log("this is audio form", audioForm);
    await fetch('/api/uploadAudio', {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
            audioFile: audioForm
        }
    })
  } catch (err) {
  console.log(err);
  }
}

//   React.useEffect(() => {

//     async function uploadVoice() {
//       const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
//       const audiofile = new File([audioBlob], "audiofile.mp3", {
//         type: "audio/mpeg",
//       });
//       const formData = new FormData();
//       formData.append("file", audioBlob);
//       await axios.post(
//         endPoint,
//         formData,
//         {
//           "content-type": "multipart/form-data",
//         }
//       );

//     }
//     if (mediaBlobUrl) {
//       uploadVice();
//     }

//   }, [mediaBlobUrl]);

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={() => {
        stopRecording()
        afterstopRecording()
      }
      }>Stop and Submit Recording</button>
      <audio src={mediaBlobUrl} controls />
      <button onClick={clearBlobUrl}>Reset Recording</button>
    </div>
  );
};

export default RecordView;




// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

// const RecordView = (props) => {
//     const {
//     //   status,
//     //   startRecording,
//     //   stopRecording,
//     //   mediaBlobUrl,
//     //   clearBlobUrl
//         status,
//         startRecording,
//         stopRecording,
//         //togglePauseResume,
//         mediaBlobUrl,
//         ///recordingBlob,
//         isRecording,
//         isPaused,
//         recordingTime,
//     } = AudioRecorder();

//     const [url, setUrl] = useState(mediaBlobUrl,);

//     const resetRecording = () => {
//       console.log("clicked");
//       // setUrl(clearBlobUrl);
//       clearBlobUrl();
//     };
    

//     // async function submitRecording (file) {
//     //     try {
//     //         await fetch('/', { file }, {
    
//     //         });
//     //         setUr();
//     //     } catch (err){
//     //     console.error(err.message);
//     //     }
//     // }

//     return(
//             <div>
//                 <p>status: {status}</p>
//                 <audio src = {mediaBlobUrl} controls></audio>
//                 <button onClick = {startRecording}> Start Recording</button>
//                 <button onClick = {stopRecording}> Stop Recording and Submit</button>
//             </div>
//         )
// }

// export default RecordView;