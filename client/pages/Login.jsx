import React, { useState } from 'react';
import { Label, TextInput, Checkbox, Button } from 'flowbite-react';

const Login = (e) => {
  //generalize email and username as identification
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  async function loginOnSubmitHandler (e) {
    e.preventDefault();
    const requestBody = {
      identification: identification,
      password: password
    }
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response)
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
  <form className="absolute top-1/2 left-1/2 bg-primary -translate-x-1/2 -translate-y-1/2 
  flex flex-col gap-4 p-10
  rounded-lg border-2 border-amber-500"
  onSubmit={loginOnSubmitHandler}
  >
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="id"
        value="Email or Username"
      />
    </div>
    <TextInput
      id="id"
      type="text"
      placeholder="Email or Username"
      required={true}
      onChange={(e) => setIdentification(e.target.value)}
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
      onChange={(e) => setPassword(e.target.value)}
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