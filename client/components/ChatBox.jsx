import React, { useEffect, useState } from 'react';
import BotChatBubble from './BotChatBubble.jsx';
import UserChatBubble from './UserChatBubble.jsx';
import RecModal from './RecModal.jsx';

const ChatBox = ({ currentConvo, user, setCurrentConvo }) => {
  const [botMessages, setBotMessages] = useState();
  const [textBoxValue, setTexBoxValue] = useState('');

  const micHandlerFunction = async () => {
    console.log('clicked');
  };
  const inputHandlerFunction = async (event) => {
    event.preventDefault();
    const input = event.target.value;
    setTexBoxValue(input);
  };

  const submitInputHandlerFunction = async (event) => {
    event.preventDefault();

    const data = await fetch('/api/chat', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        input: textBoxValue,
        botName: currentConvo.botName,
      }),
    });
    const response = await data.json();
    setCurrentConvo(response);
  };

  useEffect(() => {
    // console.log("CURRENT CONVO",currentConvo)
    const array = currentConvo.messageHistory.map((message) => {
      // console.log(message);
      if (message.createdBy === 'Paul Vachon') {
        return <UserChatBubble message={message} />;
      } else {
        return <BotChatBubble message={message} />;
      }
    });
    // console.log('created array:', array)
    setBotMessages(array);
  }, [currentConvo]);
  useEffect(() => {
    // console.log("CURRENT CONVO",currentConvo)
    const array = currentConvo.messageHistory.map((message) => {
      // console.log(message);
      if (message.createdBy === 'Paul Vachon') {
        return <UserChatBubble message={message} />;
      } else {
        return <BotChatBubble message={message} />;
      }
    });
    // console.log('created array:', array)
    setBotMessages(array);
  }, []);

  return (
    <div className=' flex justify-center h-screen mt-8 overflow-scroll'>
      <div className='relative  flex justify-center  align-bottom w-2/3 h-5/6 bg-primary shadow-xl rounded-3xl '>
        <div className='absolute bottom-6 w-full '>
          <div className='flex flex-col mx-10 mb-4 '>
            {botMessages}
          </div>
          <div className='flex justify-center'>
            <form
              onSubmit={submitInputHandlerFunction}
              className='flex w-full max-w-xl mx-4'
            >
              <input
                type='text'
                placeholder='Type here'
                className='input  input-bordered  w-full'
                onChange={inputHandlerFunction}
              />
              <RecModal micHandlerFunction={micHandlerFunction} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
