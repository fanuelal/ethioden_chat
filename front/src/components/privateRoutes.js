import {Outlet, Navigate} from 'react-router-dom'


import React from 'react'

const PrivateRoutes = ({isLoggedIn}) => {
  return (
    isLoggedIn ?
    <Outlet/>:<Navigate to='/'/>
  )
}

export default PrivateRoutes