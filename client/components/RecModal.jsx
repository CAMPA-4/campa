import React from 'react';
import AudioRecorder from './audioRecorder.jsx'

const RecModal = ({micHandlerFunction, currentConvo, setCurrentConvo, user }) => {
  return (
    <>
      <label htmlFor='my-modal' onClick={micHandlerFunction}>
        <span className='material-symbols-outlined cursor-pointer mt-1 ml-2 text-4xl text-accent hover:text-red-600 hover:bg-white hover:rounded-full hover:shadow-xl'>
          mic
        </span>
      </label>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold  text-lg'>
            Recording
          </h3>
          <AudioRecorder user={user} currentConvo={currentConvo} setCurrentConvo={setCurrentConvo}/>
          <div className='modal-action'>
            <label htmlFor='my-modal' className='btn btn-secondary'>
              STOP
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecModal;
