import React, { useState } from 'react';
import { Label, TextInput, Checkbox, Button } from 'flowbite-react';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setUserData] = useState(null);

  async function signUpHandler(e) {
    e.preventDefault();
    //construct request body
    const requestBody = {};
    //confirm both password matches
    if (repeatPassword === password) {
      //if both password are identical then we populate body
      requestBody.userName = userName;
      requestBody.password = password;
      requestBody.email = email;
    } else {
      //if not send an alert and return/end the function
      alert("password doesn't match, please try again");
      return;
    }

    fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((resData) => {
        setUserData(resData);
        setIsLoggedIn(true);
      })
      .catch(err => console.log(err))
  }

  return (
    <form
      className='absolute top-1/2 left-1/2 bg-primary -translate-x-1/2 -translate-y-1/2 
    flex flex-col gap-4 p-10 
    rounded-lg border-2 border-amber-500'
      onSubmit={signUpHandler}
    >
      {!isLoggedIn ? null : <Navigate to='/chat' state={{ data }} />}

      <h1 className='text-xl text-center text-amber-500'>SignUp</h1>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='email2' value='Your email' />
        </div>
        <TextInput
          id='email2'
          type='email'
          placeholder='name@flowbite.com'
          required={true}
          shadow={true}
          className='w-full'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='username2' value='username' />
        </div>
        <TextInput
          id='username2'
          type='text'
          placeholder='username'
          required={true}
          shadow={true}
          className='w-full'
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='password2' value='Your password' />
        </div>
        <TextInput
          id='password2'
          type='password'
          required={true}
          shadow={true}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='repeat-Password' value='Repeat password' />
        </div>
        <TextInput
          id='repeat-Password'
          type='password'
          required={true}
          shadow={true}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='agree' />
        <Label htmlFor='agree'>
          I agree with the:
          <span className='text-black dark:text-blue-500'>
            terms & conditions
          </span>
        </Label>
      </div>
      <div>
        <span>Already have an account? </span>
        <a href='/login' className='text-amber-500'>
          Login
        </a>
      </div>
      <Button
        className='bg-amber-500 p-2 text-black duration-500 hover:text-lg hover:p-3'
        type='submit'
      >
        Register new account
      </Button>
    </form>
  );
};

export default Signup;
