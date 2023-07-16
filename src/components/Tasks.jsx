import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import Todo from './Todo'
import { toast } from 'react-hot-toast'
const Tasks = ({refresh, setRefresh}) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    // const {}
    try {
        useEffect( ()=> {
            const fetchData = async () => {
                setLoading(true)
                const {data} = await axios.get(`${server}/tasks/my`,{
                    withCredentials: true
                })
                // console.log(data)
                setTasks(data.tasks)
                setLoading(false)
            }
            fetchData();
        },[refresh])
    } catch (error) {
        console.log(error.response.data.message)
    }
    const deleteHandler = async (id) => {
      try {
        const {data} = await axios.delete(`${server}/tasks/${id}`,{
          withCredentials: true
        })
        setRefresh(!refresh)
        toast.success(data.message)
      } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
    }

    const updateHandler = async (id) => {
      try {
        const {data} = await axios.put(`${server}/tasks/${id}`,{},{
          withCredentials: true
        })
        toast.success(data.message)
        setRefresh(!refresh)
      } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
    }
    if(loading) return (<div className="text-5xl w-full h-full flex justify-center pt-24">Loading...</div> )
  return (
    <div className='lg:min-w-[500px]'>
    
      {tasks.length!==0 ? <div>
      {tasks.map((task)=>(
        <Todo task={task} deleteHandler={deleteHandler} updateHandler={updateHandler} id={task._id} key={task._id} />
      ))}
      
       </div> 
       : 
       <div className='text-5xl text-center'> No tasks added</div>}
    </div>
  )
}

export default Tasks
