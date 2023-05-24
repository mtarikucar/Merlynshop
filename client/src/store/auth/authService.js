import axios from "axios";

const API_URL = 'https://squid-app-wtk8l.ondigitalocean.app/api'

const register = async (userData) => {
    const response = await axios.post(API_URL+"/auth/register", userData)
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL+"/auth/login", userData)
    return response.data.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}


export default authService