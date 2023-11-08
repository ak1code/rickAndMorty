import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
      const isAuth=useSelector((state)=>state.movie.isAuth);
      const navigate=useNavigate()
      
      return (
        //    giving the pathname to state in location
        <div>{isAuth?children:(<Navigate to={"/"} />)}</div>
      )
}

export default PrivateRoute