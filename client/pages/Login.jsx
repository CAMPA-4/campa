import React from 'react';
import { Label, TextInput, Checkbox, Button } from 'flowbite-react';

const Login = () => {
   async function loginRequest () {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login");
      const data = await response.json()
    } catch (error) {
      console.log(error);
    }
  }
  return (
  <form className="absolute top-1/2 left-1/2 bg-primary -translate-x-1/2 -translate-y-1/2 
  flex flex-col gap-4 p-10
  rounded-lg border-2 border-amber-500"
  onSubmit={loginRequest}>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Email or Username"
      />
    </div>
    <TextInput
      id="email1"
      type="email"
      placeholder="Email or Username"
      required={true}
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Your password"
      />
    </div>
    <TextInput
      id="password1"
      type="password"
      required={true}
      placeholder="password"
    />
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="remember" />
    <Label htmlFor="remember">
      Remember me
    </Label>
  </div>
  <Button className="bg-amber-500 p-2 text-black duration-500 hover:text-lg hover:p-3" type="submit">
    Submit
  </Button>
</form>)
}
export default Login;