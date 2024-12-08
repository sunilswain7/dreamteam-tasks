"use client"

import { useState } from "react";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Registration successful');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="mx-[600px]">
      <div className="flex flex-col justify-center items-center bg-slate-800 mt-60 h-72">
        <h1 className="">Register</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="" className="block">Username</label>
          <input type="text" className="text-black"value={username} onChange={(e) => setUsername(e.target.value)}/>
          <label htmlFor="" className="block">Email</label>
          <input type="email" className="text-black" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="" className="block">Password</label>
          <input type="password" className="text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="bg-green-900 w-max mt-8 rounded-md">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Register