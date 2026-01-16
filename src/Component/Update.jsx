import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateProfile, GetUser } from '../Api.response';
import '../stylesheets/Update.css';

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const request = await GetUser();
        const user = request.data.user;
        setEmail(user.email);
        setUsername(user.username);
        setAddress(user.address);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      if(img) formData.append("avatar", img);

      const request = await UpdateProfile(id, formData);
      const response = request.data;
      if(response.success){
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-container">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
