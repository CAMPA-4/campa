import React from 'react';
import { Label, TextInput, Checkbox, Button } from 'flowbite-react';

const Signup = () => {
  return (
    <form className="absolute top-1/2 left-1/2 bg-primary -translate-x-1/2 -translate-y-1/2 
    flex flex-col gap-4 p-10 
    rounded-lg border-2 border-amber-500">
      <h1 className='text-xl text-center text-amber-500'>SignUp</h1>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email2"
            value="Your email"
          />
        </div>
        <TextInput
          id="email2"
          type="email"
          placeholder="name@flowbite.com"
          required={true}
          shadow={true}
          className="w-full"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="username2"
            value="username"
          />
        </div>
        <TextInput
          id="username2"
          type="text"
          placeholder="username"
          required={true}
          shadow={true}
          className="w-full"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password2"
            value="Your password"
          />
        </div>
        <TextInput
          id="password2"
          type="password"
          required={true}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="repeat-password"
            value="Repeat password"
          />
        </div>
        <TextInput
          id="repeat-password"
          type="password"
          required={true}
          shadow={true}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree">
          I agree with the: 
          <a
            href="/forms"
            className="text-black dark:text-blue-500"
          >
          terms and conditions
          </a>
        </Label>
      </div>
      <Button className="bg-amber-500 p-2 text-black duration-500 hover:text-lg hover:p-3" type="submit">
        Register new account
      </Button>
    </form>
  )
}

export default Signup;