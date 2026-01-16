import React, { useEffect, useState } from 'react';
import { GetUser, LogoutUser } from '../Api.response';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Home.css';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const request = await GetUser();
        setUser(request.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const Logout = async () => {
    try {
      await LogoutUser();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = () => {
    navigate(`/updateprofile/${user._id}`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome {user?.username || 'User'}</h1>
        <div className="home-buttons">
          <button className="btn logout" onClick={Logout}>Logout</button>
          <button className="btn update" onClick={updateProfile}>Update Profile</button>
        </div>
      </header>

      {user ? (
        <div className="user-card">
          <img src={user.avatar} alt="avatar" className="user-avatar" />
          <div className="user-info">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default Home;
