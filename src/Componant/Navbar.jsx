import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { authorization } from '../Redux/MovieSlice'


const Navbar = () => {
       
  const isAuth=useSelector((state)=>state.movie.isAuth);
  const dispatch=useDispatch()
  console.log(isAuth)

  return (
    <nav>
      
        <Link className='navlink' to={"/movies"}><Typography.Title level={4}>Movies</Typography.Title></Link>
        <Link className='navlink' to={"/favorite"}><Typography.Title level={4}>Favorite</Typography.Title></Link>
        {
          isAuth? (<Link  className='navlink' onClick={()=>dispatch(authorization(false))}><Typography.Title level={4}>Logout</Typography.Title></Link>):(<Link className='navlink' to={"/"}><Typography.Title level={4}>Login</Typography.Title></Link>)
        }
        
    </nav>
  )
}

export default Navbar