import React from 'react';

const RecModal = ({ micHandlerFunction }) => {
  return (
    <>
      <label htmlFor='my-modal' onClick={micHandlerFunction}>
        <span className='material-symbols-outlined cursor-pointer mt-1 ml-2 text-4xl text-gray-300 hover:text-red-600 hover:bg-white hover:rounded-full hover:shadow-xl'>
          mic
        </span>
      </label>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Recording
          </h3>
          <p className='py-4'>
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
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
