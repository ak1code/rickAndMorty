import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movies from '../Pages/Movies'
import Login from '../Pages/Login'
import PrivateRoute from './PrivateRoute'

const AllRoute = () => {
  return (
    <Routes>
         <Route path='/' element={<Login/>}>Login</Route>
        <Route path='/movies' element={
          <PrivateRoute>
            <Movies/>
          </PrivateRoute>
        }>Movies</Route>
       
    </Routes>
  )
}

export default AllRoute