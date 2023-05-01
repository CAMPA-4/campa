import React, { useEffect, useState } from 'react';
import BotChatBubble from './BotChatBubble.jsx';
import UserChatBubble from './UserChatBubble.jsx';
import RecModal from './RecModal.jsx';

const ChatBox = ({ currentConvo }) => {
  const [botMessages, setBotMessages] = useState();
  const [textBoxValue, setTexBoxValue] = useState('');

  const micHandlerFunction = async () => {
    console.log('clicked')
  };
  const inputHandlerFunction = async (event) => {
    event.preventDefault();
    const input = event.target.value;
    setTexBoxValue(input);
  };

  const submitInputHandlerFunction = async (event) => {
    event.preventDefault();
    
    console.log(textBoxValue);
  };

  useEffect(() => {
    console.log('test', currentConvo);
    const array = currentConvo.messageHistory.map((message) => {
      if (message.createdBy === 'Paul Vachon') {
        return <UserChatBubble message={message} />;
      } else {
        return <BotChatBubble message={message} />;
      }
    });

    setBotMessages(array);
    console.log(botMessages);
  }, [currentConvo]);

  return (
    <div className='flex justify-center'>
      <div className='relative flex justify-center align-bottom  w-2/3 h-screen bg-primary shadow-primary shadow-xl '>
        <div className='absolute bottom-10 w-full'>
          <div className='flex flex-col mx-10 mb-4'>
            {botMessages ? botMessages : null}
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
              <RecModal micHandlerFunction={micHandlerFunction}/>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
