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
  const {isAuthenticated} = useContext(context)
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
    <div className='w-full h-screen bg-[#DAFFFB] flex justify-evenly '>
      <div className=" flex flex-col items-center mt-24  ">
      <form onSubmit={handleSubmit} className='flex flex-col ' >
        <input type="text" name="task" id="task" className='lg:w-[450px] mt-12 rounded-md h-12 bg-[#001C30] outline-none text-[#DAFFFB] p-4 placeholder:text-[#DAFFFB] shadow-lg' placeholder='Task Title' value={title} onChange={(e) => setTitle(e.target.value)}  required/>
        <textarea name="task" id="task" className='w-[450px] mt-4 rounded-md h-48 bg-[#001C30] outline-none text-[#DAFFFB] p-4 placeholder:text-[#DAFFFB] shadow-lg  ' placeholder='Task Description' value={description} onChange={(e) => setDescription(e.target.value)} required/>
        <button type='submit' className='bg-[#001C30] text-[#DAFFFB] p-3 mt-6 px-8 rounded-md shadow-md block w-full font-semibold' disabled={Loading} >Add Your Task</button>
      </form>

      </div>
      <div className="mt-32">
        <Tasks refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  )
}

export default Home
