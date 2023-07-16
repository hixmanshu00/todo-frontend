import React, { useContext, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { context } from "../main";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-hot-toast";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const {isAuthenticated, setIsAuthenticated, loading, setLoading, nav,setNav} = useContext(context);
  const handleNav = () => {
    setNav(!nav);
  }

  if(!nav){
    document.body.style.overflow = "hidden";
  }
  else{
    document.body.style.overflow = "visible"
  }
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
      <div className="w-[1250px] md:flex p-4 justify-between items-center hidden">
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
          {/* <div className="flex w-full px-6 justify-between md:hidden">
          <Link to='/'>
        <h1 className="uppercase text-3xl font-semibold py-4">todo</h1>
      </Link>
      {
        isAuthenticated ?
        <div className="py-5">
        <AiOutlineMenu size={30} className=""/>
        </div> 
        :
        <Link
            to="/login"
            className="px-8 h-[40px] my-4 rounded-lg  flex items-center bg-[#176B87] font-semibold  hover:font-bold"
          >
            Howdy, user!
          </Link>

      }
          </div> */}

          <div className="flex p-4 justify-between md:hidden w-full bg-[#001C30] text-[#DAFFFB] h-[55px] items-center">
      <div>
      <Link to='/'>
        <h1 className="uppercase text-3xl font-semibold py-4">todo</h1>
      </Link>
        </div>
          {isAuthenticated ? 

        <div onClick={handleNav} className="text-white">
        {nav? <AiOutlineMenu size={25} className="font-extrabold" /> : <AiOutlineClose size={25} className="z-20"/> }
        <div className={nav? 'absolute right-[-100%]' : 'fixed top-16 right-0 flex flex-col bg-[#001C30] text-[#DAFFFB]  w-full sm:w-[447px] p-4 h-[100%] py-3 ease-in-out duration-300 z-30'}>
            <ul>
              <li className=' text-4xl font-md px-4'><Link to='/'>Home</Link></li>
              <li className=' text-4xl font-md px-4 py-5'><Link to='/profile'>Profile</Link></li>

              <div className= 'border-t-2 border-white  w-5 my-10 mx-4'></div>
              <li className='  text-3xl font-thin px-4 '> <button onClick={logout} disabled={loading}>Logout</button></li>
            </ul>
            <div className='flex  items-center mt-64 mx-4 cursor-pointer'>

            <Link to='/'>
        <h1 className="uppercase text-xl py-4">todo</h1>
      </Link>
            </div>
          </div>
        </div>
        :
        <div className="">
        <Link
            to="/login"
            className="px-8 h-[40px] my-4 rounded-lg  flex items-center bg-[#176B87] font-semibold  hover:font-bold"
          >
            Howdy, user!
          </Link>
        </div>
          }


    </div>
    </div>
  );
};

export default Navbar;
