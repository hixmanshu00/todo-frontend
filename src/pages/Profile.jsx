import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../main'
import Loading from '../components/Loading'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const {user, loading, isAuthenticated} = useContext(context)
  if(!isAuthenticated){
    return <Navigate to='/login'/>
  }
  console.log(user.createdAt)
  let joinedAt = "null";
  if(user.createdAt){
    joinedAt = user.createdAt.slice(0,10)
  }
  // console.log(typeof user.createdAt)
  if(loading) return <Loading />
  else
  return (
    <div className="w-full h-screen bg-[#001C30] flex justify-center items-center flex-col">
        <div
        className="w-[420px] h-[240px] mb-20 rounded-full shadow-lg bg-[#DAFFFB] flex flex-col p-12 mt-20 text-[#001C30]  text-left  pr-4"  
      >

      <h1 className='text-xl font-extrabold pl-4 '>Name : {user.name}</h1>
      <h1 className='text-xl font-extrabold pl-4 my-6 '>Email : {user.email}</h1>
      <h1 className='text-xl font-extrabold pl-4 '>joinedAt : {joinedAt}</h1>
      {/* <h1 className='text-xl font-bold '>userID : {user._id}</h1> */}
      </div>
      
    </div>
  )
}

export default Profile
