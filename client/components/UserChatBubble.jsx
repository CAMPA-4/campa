import React from 'react'



const UserChatBubble = ({message}) => {
  return (
    <div className='chat chat-end  my-2'>
    <div className='chat-image avatar'>
      <div className='w-10 rounded-full'>
        {/* <img src='/images/stock/photo-1534528741775-53994a69daeb.jpg' /> */}
      </div>
    </div>
    <div className='chat-header'>
    {/* new Date(message.time).toLocaleTimeString('en-US') */}
      <time className='text-xs opacity-50 mr-4'>{new Date(message.time).toLocaleTimeString('en-US')}</time>
      {message.createdBy}
    </div>
    <div className='chat-bubble'>{message.text}</div>
    {/* <div className='chat-footer opacity-50'>Delivered</div> */}
  </div>
  )
}

export default UserChatBubble