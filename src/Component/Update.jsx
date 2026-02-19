// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { UpdateProfile, GetUser } from '../Api.response';
// // import '../stylesheets/Update.css';

// // function Update() {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [img, setImg] = useState(null);

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const request = await GetUser();
// //         const user = request.data.user;
// //         setEmail(user.email);
// //         setUsername(user.username);
// //         setAddress(user.address);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       formData.append("username", username);
// //       formData.append("email", email);
// //       formData.append("password", password);
// //       formData.append("address", address);
// //       if(img) formData.append("avatar", img);

// //       const request = await UpdateProfile(id, formData);
// //       const response = request.data;
// //       if(response.success){
// //         navigate('/home');
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div className="update-container">
// //       <h1>Update Profile</h1>
// //       <form onSubmit={handleSubmit} className="update-form">
// //         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
// //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
// //         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
// //         <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
// //         <input type="file" onChange={(e) => setImg(e.target.files[0])} />
// //         <button type="submit">Update</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Update;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { UpdateProfile, GetUser } from "../Api.response";
// import "../stylesheets/Update.css";

// function Update() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [address, setAddress] = useState("");
//   const [img, setImg] = useState(null);

//   // Fetch user details on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const request = await GetUser();
//         const user = request.data.user;
//         setEmail(user.email);
//         setUsername(user.username);
//         setAddress(user.address);
//       } catch (error) {
//         console.log("Fetch user error:", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//      const formData = new FormData();
// formData.append("username", username);
// formData.append("email", email);
// formData.append("address", address);
// if(password) formData.append("password", password);
// if(img) formData.append("avatar", img);

// // await UpdateProfile(id, formData);

//       const request = await UpdateProfile(id, formData);
//       const response = request.data;

//       if (response.success) {
//         navigate("/home");
//       } else {
//         console.log("Update failed:", response.message);
//       }
//     } catch (error) {
//       console.log("Axios error:", error);
//     }
//   };

//   return (
//     <div className="update-container">
//       <h1>Update Profile</h1>
//       <form onSubmit={handleSubmit} className="update-form">
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="New Password (optional)"
//         />
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="Address"
//         />
//         <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// export default Update;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateProfile, GetUser } from "../Api.response";
import "../stylesheets/Update.css";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    address: ""
  });
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const request = await GetUser();
        const user = request.data.user;
        setFormData({
          email: user.email,
          username: user.username,
          address: user.address || ""
        });
        setError("");
      } catch (error) {
        setError("Failed to load user data");
        console.log("Fetch user error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updateData = new FormData();
      updateData.append("username", formData.username);
      updateData.append("email", formData.email);
      updateData.append("address", formData.address);
      if (password.trim()) updateData.append("password", password);
      if (img) updateData.append("avatar", img);

      const request = await UpdateProfile(id, updateData);
      const response = request.data;

      if (response.success) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setError(response.message || "Update failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Network error occurred");
      console.log("Axios error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-container">
      <div className="update-form-wrapper">
        <h1 className="update-title">Update Profile</h1>
        
        {error && <div className="update-message error">{error}</div>}
        {success && <div className="update-message success">{success}</div>}
        
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password (old)</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar">Profile Picture</label>
            <input
              type="file"
              id="avatar"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              disabled={loading}
            />
            {img && <span className="file-name">{img.name}</span>}
          </div>

          <button 
            type="submit" 
            className="update-button"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;