import React from 'react'
import { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
        <h1>Login</h1>
        <form>
            <label htmlFor="text">Username</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login