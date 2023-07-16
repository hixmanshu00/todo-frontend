import Navbar from "./components/Navbar"
import './index.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import { Toaster } from "react-hot-toast"
import {BrowserRouter as Router} from 'react-router-dom'
import { useContext, useEffect } from "react"
import axios from "axios"
import { context } from "./main"
import { server } from "./main"


function App() {
  const {setUser, setIsAuthenticated,refresh, setLoading, loading} = useContext(context)
  // console.log("isLoaidin ", loading)

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials: true,
    })
    .then((res)=> {
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(false)
      setIsAuthenticated(false)
      console.log(error)
      setUser({})
    })
  }, [refresh])
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
