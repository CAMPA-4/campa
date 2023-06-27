import React from 'react';

const BotChatBubble = ({ message }) => {
  // console.log('AUDIO URL', message.audio)
  return (
    <div className='chat chat-start w-96 my-2'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          {/* <img src='/images/stock/photo-1534528741775-53994a69daeb.jpg' /> */}
        </div>
      </div>
      <div className='chat-header'>
        {message.createdBy}
        {/*  */}
        <time className='text-xs opacity-50 ml-2'>
          {new Date(message.time).toLocaleTimeString('en-US')}
        </time>
      </div>
      <div>
        <audio type='audio/mpeg' controls src={message.audio}></audio>
      </div>
      <div className='chat-bubble bg-secondary'>{message.text}</div>
      {/* <div className='chat-footer opacity-50'>Delivered</div> */}
    </div>
  );
};

export default BotChatBubble;
