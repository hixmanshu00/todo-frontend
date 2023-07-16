import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { context, server } from "../main";
import { toast } from "react-hot-toast";

const Signup =  () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated,loading, setLoading,setRefresh,refresh} = useContext(context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        toast.loading("Please wait...")
        const {data} = await axios.post(`${server}/users/register`,{
            name, email, password
        },{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true
        })
        setLoading(false)
        setRefresh(!refresh)
        setIsAuthenticated(true);
        toast.success(data.message)
    } catch (error) {
        setIsAuthenticated(false);
        toast.error(error.response.data.message)
    }



  };
  if(isAuthenticated){
    return <Navigate to='/' />
}
  return (
    <div className="w-full h-screen bg-[#001C30] flex justify-center items-center flex-col">
      <form
        className="w-[420px] h-[300px] mb-20 rounded-full shadow-lg bg-[#DAFFFB] flex flex-col items-center mt-20 text-[#001C30] "
        onSubmit={handleSubmit}
      >
        <input
          type="name"
          name="name"
          id="name"
          placeholder="name"
          className="p-4 my-2 py-3 mt-12  w-[300px] outline-none rounded-md placeholder:text-[#001C30] placeholder:font-semibold"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="p-4 my-2 py-3   w-[300px] outline-none rounded-md placeholder:text-[#001C30] placeholder:font-semibold"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="p-4 my-2 py-3 w-[300px] outline-none rounded-md placeholder:text-[#001C30] placeholder:font-semibold "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="px-8 text-center h-[40px] my-4 rounded-lg uppercase bg-[#001C30] hover:bg-[#176B87]  font-semibold  hover:font-bold text-[#DAFFFB] mx-4 "
          type="submit"
          disabled={loading}
        >
          signup
        </button>
      </form>
      <p className="text-[#DAFFFB] ">
        Already have an account?{" "}
        <Link to="/login">
          {" "}
          <span className="underline font-bold cursor-pointer underline-offset-2">
            login
          </span>{" "}
        </Link>{" "}
      </p>
    </div>
  );
};

export default Signup;
