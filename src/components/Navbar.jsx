import React, { useContext } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { context } from "../main";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(context);
  const logout = async () => {
    setLoading(true)
    try {
      toast.loading("Logging out")
      const {data} = await axios.get(`${server}/users/logout`,{
        withCredentials: true
      })
      setIsAuthenticated(false)
      toast.dismiss()
      toast.success("Logged out")
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }
  if (!isAuthenticated){
     <Navigate to='/login' />
    
}


  return (
    <div className="w-full fixed h-[75px] bg-[#001C30] text-[#DAFFFB] flex items-center justify-around ">
      <div className="w-[1250px] flex p-4 justify-between items-center">
      <Link to='/'>
        <h1 className="uppercase text-4xl font-semibold">todo</h1>
      </Link>
        <div className="flex">
        {isAuthenticated? 
          <Link
            to="/"
            className="px-8 h-[70px] py-5 hover:bg-[#DAFFFB] hover:text-[#001C30] font-semibold hover:text-lg hover:font-bold"
          >
            Home
          </Link>

          : "" }
          {isAuthenticated? 
          <Link
            to="/profile"
            className="px-8 h-[70px] py-5 hover:bg-[#DAFFFB] hover:text-[#001C30] font-semibold hover:text-lg hover:font-bold"
          >
            Profile
          </Link>

          : "" }
          {!isAuthenticated ? 
          <Link
            to="/login"
            className="px-8 h-[40px] my-4 rounded-lg  flex items-center bg-[#176B87] font-semibold  hover:font-bold"
          >
            Howdy, user!
          </Link>
            :
            <button
            className="px-8 h-[40px] my-4 rounded-lg uppercase flex items-center bg-[#176B87] hover:bg-[#DAFFFB] hover:text-[#176B87] font-semibold  hover:font-bold"
            onClick={logout}
            disabled={loading}
          >
            Logout
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
