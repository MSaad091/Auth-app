import axios from 'axios'



// const api = axios.create({
//     baseURL:"http://localhost:8000/user",
//     withCredentials:true
// })
const api = axios.create({
    baseURL: "https://auth-backend-nine.vercel.app/user",
    withCredentials:true
})

export const RegisterUser = (formdata) => api.post('/register',formdata)

export const LoginUser = (formdata) => api.post('/login',formdata)

export const UpdateProfile = (id,formdata) => api.put(`/updateprofile/${id}`,formdata)

export const LogoutUser = () => api.post('/logout')

export const GetUser = () => api.get('/getuser')