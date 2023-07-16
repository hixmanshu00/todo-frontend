import React from 'react'
import {AiFillDelete} from 'react-icons/ai'

const Todo = ({task, deleteHandler, updateHandler,id}) => {
  return (
    <div className='mb-6 flex justify-between shadow-lg rounded-lg p-4 '>
        <div className="flex flex-col">
      <h1 className='font-semibold text-xl'>{task.title}</h1>
      <p>{task.description}</p>
        </div>
        <div className="gap-4 flex">
        <input type="checkbox" onChange={()=>updateHandler(id)} checked={task.isCompleted} className='w-6 accent-[#176B87] outline-none' />
        <button onClick={()=>deleteHandler(id)}>
        <AiFillDelete size={28} className='outline-none'/>
        </button> 
        </div>
    </div>
  )
}

export default Todo
