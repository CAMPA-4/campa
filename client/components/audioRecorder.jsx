import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const recorder = new MicRecorder({ bitRate: 128 });

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [mp3URL, setMp3URL] = useState('');

  const startRecording = () => {
    recorder
      .start()
      .then(() => {
        setIsRecording(true);
      })
      .catch((e) => console.error(e));
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        try {
          const url = URL.createObjectURL(blob);
          const file = new File(buffer, 'recording.mp3', { type: blob.type });
          // console.log("FILE")
          // console.log(file)
          const player = new Audio(URL.createObjectURL(file));
          // console.log("PLAYER")
          // console.log(player)
          // console.log("BUFFER")
          // console.log(buffer)
          setBlobURL(url);
          // console.log("BLOG-URL")
          // console.log(url)

          const formData = new FormData();
          formData.append('audioFile', file);
          formData.append('key', `${file.lastModified}`);
          // console.log("FORM-DATA")
          // console.log(formData)

          const transcript = await fetch('/api/uploadAudio', {
            method: 'POST',
            body: formData,
          });
          setIsRecording(false);
        } catch (err) {
          console.log(err);
        }
      });
  };

  return (
    <div className='flex align-middle justify-center'>
      {blobURL && <audio controls src={blobURL} />}
      {mp3URL && <audio controls src={mp3URL} />}
      {isRecording ? (
        <button className='btn btn-secondary' onClick={stopRecording}>
          Stop Recording
        </button>
      ) : (
        <button className='btn btn-primary' onClick={startRecording}>
          Start Recording
        </button>
      )}
    </div>
  );
};

export default AudioRecorder;

//import './App.css';
// import axios from "axios";

// let gumStream = null;
// let recorder = null;
// let audioContext = null;

// function AudioRecorder() {

//     const startRecording = () => {
//         let constraints = {
//             audio: true,
//             video: false
//         }

//         audioContext = new window.AudioContext();
//         console.log("sample rate: " + audioContext.sampleRate);

//         navigator.mediaDevices
//             .getUserMedia(constraints)
//             .then(function (stream) {
//                 console.log("initializing Recorder.js ...");

//                 gumStream = stream;

//                 let input = audioContext.createMediaStreamSource(stream);

//                 recorder = new window.Recorder(input, {
//                     numChannels: 1
//                 })

//                 recorder.record();
//                 console.log("Recording started");
//             }).catch(function (err) {
//                 //enable the record button if getUserMedia() fails
//         });

//     }

//     const stopRecording = () => {
//         console.log("stopButton clicked");

//         recorder.stop(); //stop microphone access
//         gumStream.getAudioTracks()[0].stop();

//         recorder.exportWAV(onStop);
//     }

//     const onStop = (blob) => {
//         console.log("uploading...");

//         let data = new FormData();

//         data.append('text', "this is the transcription of the audio file");
//         data.append('wavfile', blob, "recording.wav");

//         const config = {
//             headers: {'content-type': 'multipart/form-data'}
//         }
//         //axios.post('http://localhost:8080/asr/', data, config);
//     }

//     return (
//         <div>
//             <button onClick={startRecording} type="button">Start</button>
//             <button onClick={stopRecording} type="button">Stop</button>
//         </div>
//     );
// }

// export default AudioRecorder;

///BRAND NEW

// const AudioRecorder = () => {
//   navigator.mediaDevices.getUserMedia({audio:true}).then(stream => handlerFunction(stream))
//   let rec = new MediaRecorder(stream)

//   const handlerFunction = () =>{
//     // let rec = new MediaRecorder(stream)
//     rec.ondataavailable = e =>{
//       audioChunks/push(e.data)
//       if(rec.state == "inactive"){
//         let blob = new Blob(audioChunks, {type:'audio/mp3'})
//         console.log(blob)
//         recordedAudio.src = URL.createObjectURL(blob)
//         console.log(recordedAudio.src)
//         recordedAudio.controls = true
//         recordedAudio.autoplay = true
//       }
//     }
//   }

//   const record = () => {
//     console.log('clicked')
//     let audioChunks = []
//     rec.start()

//   }

//   const stopRecord = () => {
//     console.log('clicked again')
//     record.disabled = false
//     stop.disabled = true
//     rec.stop()
//   }

//   return(
//     <div>
//       <button id='record' onClick={record}>Start</button>
//       <button id='stopRecord' onClick={stopRecord}>Stop</button>

//     </div>
//   )
// }

// export default AudioRecorder;

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

// import { useReactMediaRecorder } from "react-media-recorder";
// import React, { useState } from "react";

// const RecordView = () => {
//   const {
//     status,
//     startRecording,
//     stopRecording,
//     mediaBlobUrl,
//     clearBlobUrl
//   } = useReactMediaRecorder(
//     {
//         audio: true
//         // blobPropertyBag: {type: "audio/mp3"
//     }
// );

//   const [url, setUrl] = useState(mediaBlobUrl);
//   console.log("the url", mediaBlobUrl)
//   const resetRecording = () => {
//     console.log("clicked");
//     // setUrl(clearBlobUrl);
//     clearBlobUrl();
//   };

//   const afterstopRecording = async () => {
//     try {
//     const audioBlob = await fetch(mediaBlobUrl);
//     console.log("we made audioblob", audioBlob);

//     const newBlob = audioBlob.blob();
//     console.log("we made newBlog", newBlob);

//     const audioFile = new File([newBlob], 'voice.wav', { type: 'audio/wav' });

//     const audioForm = new FormData();

//     audioForm.append('file', audioFile);
//     console.log("this is audio form", audioForm);
//     await fetch('/api/uploadAudio', {
//         method: 'POST',
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         body: {
//             audioFile: audioForm
//         }
//     })
//   } catch (err) {
//   console.log(err);
//   }
// }

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
//   return (
//     <div>
//       <p>{status}</p>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={() => {
//         stopRecording()
//         afterstopRecording()
//       }
//       }>Stop and Submit Recording</button>
//       <audio src={mediaBlobUrl} controls />
//       <button onClick={clearBlobUrl}>Reset Recording</button>
//     </div>
//   );
// };

// export default RecordView;
