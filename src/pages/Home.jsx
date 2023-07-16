import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../main';
import { toast } from 'react-hot-toast';
import Tasks from '../components/Tasks';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('')
  const [description ,  setDescription] = useState('')
  const [Loading, setLoading] = useState(false)
  const {isAuthenticated, nav} = useContext(context)
  const [refresh, setRefresh] = useState(false)

  if(!isAuthenticated){
    return <Navigate to='/login'/>
  }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true)
          toast.loading("Adding task")
          const {data} = await axios.post(`${server}/tasks/new`,{
            title, description
          },{
            withCredentials: true
          })
          toast.dismiss()
          toast.success(data.message)
          setTitle("")
          setDescription("")
          setRefresh(!refresh)
          setLoading(false)
        } catch (error) {
          toast.dismiss()
          setLoading(false)
          toast.error(error.response.data.message)
        }
    }
  return (
    <div className=' w-full min-h-screen h-full bg-[#DAFFFB] flex flex-col lg:flex-row  justify-evenly '>
      {nav ? 
      <div className=" flex flex-col items-center lg:mt-24 lg:p-0 fixed  top-16 lg:top-0 lg:left-[10%] pt-6 lg:max-w-fit lg:pt-0  w-screen bg-[#DAFFFB] pb-6">
      
      <form onSubmit={handleSubmit} className='flex flex-col items-center ' >
        <input type="text" name="task" id="task" className='lg:w-[450px] w-[350px] mt-4 lg:mt-12 rounded-md h-12 bg-[#001C30] outline-none text-[#DAFFFB] p-4 placeholder:text-[#DAFFFB] shadow-lg' placeholder='Task Title' value={title} onChange={(e) => setTitle(e.target.value)}  required/>
        <textarea name="task" id="task" className='lg:w-[450px] w-[350px] mt-4 rounded-md lg:h-48 bg-[#001C30] outline-none text-[#DAFFFB] p-4 placeholder:text-[#DAFFFB] shadow-lg  ' placeholder='Task Description' value={description} onChange={(e) => setDescription(e.target.value)} required/>
        <button type='submit' className='bg-[#001C30] text-[#DAFFFB] p-3 mt-6 px-8 rounded-md shadow-md block w-full font-semibold' disabled={Loading} >Add Your Task</button>
      </form>
      <h1 className="text-5xl mt-8 font-bold text-[#001C30] lg:hidden">Tasks</h1>
      </div>
      : <div></div>}
      <div className="lg:mt-32 mt-[400px] lg:ml-[500px] pt-4 lg:pt-0 ">
        <Tasks refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  )
}

export default Home
