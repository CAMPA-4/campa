import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox.jsx';
import { useLocation } from 'react-router-dom';

const ChatDash = (props) => {
  // GRABS STATE FROM REDIRECT
  const {
    state: { data },
  } = useLocation();
  // onsole.log(userData);
  const [userData, setUserData] = useState(data);
  const [convosArray, setConvosArray] = useState([]);
  const [currentConvo, setCurrentConvo] = useState(null);
  const [user, setUser] = useState(userData.userName);
  // console.log('currentconvo:', currentConvo)
  // initilizes conversations tabs
  useEffect(() => {
    if (userData.conversations.length === 0) {
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData.userName }),
      })
        .then((response) => response.json())
        .then((resdata) => {
          // console.log('RESDATA:', resdata)
          const array = resdata.conversations.map((instance, key) => {
            console.log('instance:', instance)
            return (
              <li
                key={key}
                className=''
                onClick={() => convoHandlerFunction(instance.botName)}
              >
                <a>{instance.botName}</a>
              </li>
            );
          });
          setUserData(resdata)
          setCurrentConvo(resdata.conversations[0]);
          setConvosArray(array);
        })
        .catch((err) => console.log(err));
    } else {
      const array = userData.conversations.map((instance, key) => {
        return (
          <li
            key={key}
            className=''
            onClick={() => convoHandlerFunction(instance.botName)}
          >
            <a>{instance.botName}</a>
          </li>
        );
      });
      setConvosArray(array);
    }
  }, [userData]);

  const convoHandlerFunction = (botName) => {
    let newConvo;
    // console.log(userData.conversations);
    userData.conversations.forEach((bot) => {
      if (bot.botName === botName) return (newConvo = bot);
    });
    setCurrentConvo(newConvo);
  };

  return (
    <>
      <div className='drawer w-screen '>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          {/* <!-- Page content here --> */}
          <label
            htmlFor='my-drawer'
            className='absolute btn btn-primary drawer-button m-2 hover:translate-x-2 '
          >
            <span class='material-symbols-outlined '>chevron_right</span>
          </label>
          {currentConvo ? (
            <ChatBox
              currentConvo={currentConvo}
              user={user}
              setCurrentConvo={setCurrentConvo}
            />
          ) : null}
        </div>
        <div className='drawer-side '>
          <label htmlFor='my-drawer' className='drawer-overlay '></label>

          <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
            <h3 className='text-white text-xl mb-4'>Conversations</h3>
            {/* <!-- Sidebar content here --> */}
            {convosArray}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChatDash;
