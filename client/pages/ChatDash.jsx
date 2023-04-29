import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox.jsx';

const converstations = {
  joeBiden: {
    botName: 'Joe Biden',
    messageHistory: [
      {
        time: Date.now(),
        createdBy: 'Paul Vachon',
        audio: '',
        text: "Wouldn't you like to know weatherboy.",
      },
      {
        time: Date.now(),
        createdBy: 'Joe Biden',
        audio: '',
        text: "I would. It's good for the economy.",
      },
      {
        time: Date.now(),
        createdBy: 'Joe Biden',
        audio: '',
        text: "I would. It's good for the economy.",
      },
    ],
  },
  meganFox: {
    botName: 'Megan Fox',
    messageHistory: [
      {
        time: Date.now(),
        createdBy: 'Paul Vachon',
        audio: '',
        text: 'I love you',
      },
      {
        time: Date.now(),
        createdBy: 'Megan Fox',
        audio: '',
        text: 'Shut up whore',
      },
    ],
  },
};

const ChatDash = () => {
  const [convos, setConvos] = useState(Object.keys(converstations));
  const [convosArray, setConvosArray] = useState();
  const [currentConvo, setCurrentConvo] = useState(converstations.joeBiden);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const array = convos.map((instance, key) => {
      return (
        <li
          key={key}
          className=''
          onClick={() => convoHandlerFunction(instance)}
        >
          <a>{instance}</a>
        </li>
      );
    });
    setConvosArray(array);
  }, [convos]);
  

  const convoHandlerFunction = (botName) => {
    setCurrentConvo(converstations[botName]);
  };

  return (
    <>
      <div className='drawer w-screen'>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          {/* <!-- Page content here --> */}
          <label
            htmlFor='my-drawer'
            className='absolute btn btn-primary drawer-button m-2 hover:translate-x-2 '
          >
            <span class='material-symbols-outlined '>chevron_right</span>
          </label>
          <ChatBox currentConvo={currentConvo} />
        </div>
        <div className='drawer-side '>
          <label htmlFor='my-drawer' className='drawer-overlay '></label>

          <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
            <h3 className='text-white'>Conversations</h3>
            {/* <!-- Sidebar content here --> */}
            {convosArray}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChatDash;
