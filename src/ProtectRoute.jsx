import React from 'react'
import { Navigate, UNSAFE_getPatchRoutesOnNavigationFunction } from "react-router-dom";
function ProtectRoute({children}) {
const token = localStorage.getItem("token")

if (!token) {
    return <Navigate to='/login' replace />

}
return children
}

export default ProtectRoute  





