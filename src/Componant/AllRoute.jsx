import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movies from '../Pages/Movies'
import Login from '../Pages/Login'
import PrivateRoute from './PrivateRoute'
import Favorite from '../Pages/Favorite'
import ProductDetail from '../Pages/ProductDetail'

const AllRoute = () => {
  return (
    <Routes>
         <Route path='/' element={<Login/>}>Login</Route>
        <Route path='/movies' element={
          <PrivateRoute>
            <Movies/>
          </PrivateRoute>
        }>Movies</Route>
        <Route path='/favorite' element={<Favorite/>}>Favorite</Route>
        <Route path='/productDetail/:id' element={<ProductDetail/>}>Product Detail</Route>
    </Routes>
  )
}

export default AllRoute