import React, { useState } from 'react';
import { LoginUser } from '../Api.response';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await LoginUser({ email, password });
      const response = request.data;
      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate('/home');
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className='login-main'>
      <div className='login-card'>
        <h2>Welcome Back 👋</h2>
        <p>Please login to continue</p>
      <form onSubmit={handleSubmit} className='login-form'>
  <label>Email</label>
  <input 
    type="email" 
    value={email} 
    placeholder='Enter Your Email' 
    onChange={(e) => setEmail(e.target.value)} 
  />

  <label>Password</label>
  <input 
    type="password" 
    value={password} 
    placeholder='Enter Your Password'
    onChange={(e) => setPassword(e.target.value)} 
  />

  <button type='submit'>Login</button>
</form>

<p className="register-text">
  Don’t have an account?{" "}
  <span onClick={() => navigate("/register")}>
    Register
  </span>
</p>

      </div>
    </div>
  );
}

export default Login;
