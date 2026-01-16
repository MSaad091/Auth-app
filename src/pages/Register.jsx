import React, { useState } from 'react';
import { RegisterUser } from '../Api.response';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import '../stylesheets/Register.css';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      if(img) formData.append("avatar", img);

      const request = await RegisterUser(formData);
      const response = request.data;

      if(response.success){
        toast.success("Registration Successful 🎉");
        navigate('/login');
      } else {
        toast.error(response.message || "Registration failed ❌");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
      console.log(error.response?.data || error.message);
    }
  };

  return (
   <div className='register-main'>
  <div className='register-card'>
    <h1>Register</h1>

    <form onSubmit={handleSubmit} className='register-form'>
      <label>Username</label>
      <input
        type="text"
        value={username}
        placeholder='Enter Your Name'
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Email</label>
      <input
        type="text"
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

      <label>Address</label>
      <input
        type="text"
        value={address}
        placeholder='Enter Your Address'
        onChange={(e) => setAddress(e.target.value)}
      />

      <label>Upload Avatar</label>
      <input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
      />

      <button type='submit'>Register</button>
    </form>

    {/* 👇 Login option */}
    <p className="login-text">
      Already have an account?{" "}
      <span onClick={() => navigate("/login")}>
        Login
      </span>
    </p>

  </div>
</div>

  );
}

export default Register;
