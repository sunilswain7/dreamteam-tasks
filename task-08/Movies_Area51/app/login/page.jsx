"use client"
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Login successful');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="mx-[600px]">
      <div className="flex flex-col justify-center items-center bg-slate-800 mt-60 h-72">
        <h1 className="">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="" className="block">Email</label>
          <input type="email" className="text-black" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="" className="block">Password</label>
          <input type="password" className="text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="bg-green-900 w-max mt-8 rounded-md">Submit</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Login