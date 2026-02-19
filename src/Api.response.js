import axios from 'axios'

const api = axios.create({
    // baseURL: "http://localhost:8000/user", // backend URL
    baseURL:"https://auth-backend-eqpd.onrender.com/user",
    withCredentials: true, // ✅ Needed for cookies
});

// Register
export const RegisterUser = (formdata) => api.post('/register', formdata);

// Login
export const LoginUser = (formdata) => api.post('/login', formdata);

// Update Profile
export const UpdateProfile = (id, formdata) =>
    api.put(`/updateprofile/${id}`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' } // ✅ Must be multipart/form-data for files
    });

// Logout
export const LogoutUser = () => api.post('/logout');

// Get User
export const GetUser = () => api.get('/getuser');
