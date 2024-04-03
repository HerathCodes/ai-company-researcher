import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        username,
        email,
        password
      }),
      })
      
    const data = await response.json();
    console.log(data);

    if (data.status === 200) {
      navigate('/login')
    } 
  }
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
            <label htmlFor="text">Username</label>
            <input 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
            />
            <label htmlFor="email">Email</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email" 
            />
            <label htmlFor="password">Password</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register