import {Outlet, Navigate, useLocation} from 'react-router-dom'

import React from 'react'

const PrivateRoutes = ({isLogin}) => {
  const location = useLocation();
  
  return (
    isLogin()?
    <Outlet/>:<Navigate to='/' state={{from: location}} replace/>
  )
}

export default PrivateRoutes