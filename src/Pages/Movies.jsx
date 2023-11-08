import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCart from '../Componant/MovieCard';
import { Col, Divider, Row,Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, loading,error, reload } from '../Redux/MovieSlice';
import {Suspense, lazy} from "react"
import LoaderComp from './LoaderComp';




const Movies = () => {

  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
 
  
  const dispatch=useDispatch();
  const movies=useSelector((state)=>state.movie.movieData);
  const loadingMovie=useSelector((state)=>state.movie.loading);
  console.log(movies)
  console.log(loadingMovie)


  useEffect(()=>{
    GetData()
  },[page]);

  useEffect(()=>{
    dispatch(reload())
  },[])
  
  
  const GetData=async()=>{
      dispatch(loading(true))
      try {
        let res=await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
          setData((pre)=>[...pre,...res.data.results] );
           
         dispatch(getMovie(res.data.results))

          dispatch(loading(false))
           
      } catch (err) {
         console.log(err)
         dispatch(loading(false))
         dispatch(error)
      }
  }


  const handleInfiniteScroll=async()=>{
    // console.log("scroll height"+ document.documentElement.scrollHeight)
    // console.log("ineer height",window.innerHeight)
    try {
        if(window.innerHeight+document.documentElement.scrollTop+1 >=document.documentElement.scrollHeight ){
          setPage((pre)=>pre+1)
        }
    } catch (error) {
      console.log(error)
    }
  }
    
  useEffect(()=>{
    window.addEventListener("scroll",handleInfiniteScroll);

     return ()=>window.removeEventListener("scroll",handleInfiniteScroll)
  })

  
   
  return (
    <div>
      <h1 className='heading'>Movies</h1>
      {
        loadingMovie && <LoaderComp/>
      }
      <Row >
      {
        movies?.map((item,index)=>(
          <Col className="gutter-row"  span={6} key={index}>
            <Suspense fallback={<h1>Loading</h1>}>
          <MovieCart  {...item} />
            </Suspense>
          </Col>
        ))
      }
      </Row>
    </div>
  )
}
 


export default Movies



