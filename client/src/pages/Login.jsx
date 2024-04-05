import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        email,
        password
      }),
      })
      
    const data = await response.json();
    if (data.user) {
      alert('Login successful!')
      localStorage.setItem('token', data.user)
      navigate('/')
    } else {
      alert('Invalid Login.')
    }
    console.log(data);
  } 

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
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
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login