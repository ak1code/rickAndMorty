import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import MovieCart from '../Componant/MovieCard';
import { Col, Divider, Row,Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, loading,error, reload, removeCheckedMovie, resetData } from '../Redux/MovieSlice';
import {Suspense, lazy} from "react"
import LoaderComp from './LoaderComp';
import { movetofav } from '../Redux/FavoriteSlice';



const Movies = () => {

  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  
  
  const dispatch=useDispatch();
  const movies=useSelector((state)=>state.movie.movieData);
  const favData=useSelector((state)=>state.favorite.favorite);
  const loadingMovie=useSelector((state)=>state.movie.loading);
  
  const checkRef=useRef();
   console.log("🚀 ~ file: Movies.jsx:25 ~ Movies ~ checkRef:", checkRef)
   
  console.log("checkref",checkRef)
 
  

console.log("movie",movies)

  useEffect(()=>{
     
    if(page<=42){
      GetData()
    }
    
  },[page]);
  console.log("🚀 ~ file: Movies.jsx:40 ~ Movies ~ page:", page)

  
  
  
  const GetData=async()=>{
      dispatch(loading(true))
        try {
          let res=await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
            setData((pre)=>[...pre,...res.data.results] );
             let apidata=res.data.results;
              
            apidata= apidata.map((item)=>{
                return {...item,isCheck:false}
            })
             

             const filterID = new Set(favData.map(obj => obj.id));
             let MovieID=new Set(movies.map(obj=>obj.id));

             const uniqueItems = apidata.filter(obj => !filterID.has(obj.id));
             const final=uniqueItems.filter(obj=>!MovieID.has(obj.id));
              

            dispatch(getMovie(final))
  
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

  const moveFavorite=()=>{
     
        let finalCheck=checkRef.current;
        dispatch(movetofav(finalCheck));

        const CheckID = new Set(finalCheck.map(obj => obj.id));
        const postItems=movies.filter(obj=>!CheckID.has(obj.id));

       dispatch(removeCheckedMovie(postItems))  
       dispatch(resetData())
       checkRef.current=[]
  }
  
   
  return (
    <div>
      <h1 className='heading'>Movies</h1>
      {checkRef.current!==undefined && checkRef.current?.length!==0 && <Button onClick={moveFavorite}>add to favorite</Button>}
      {
        loadingMovie && <LoaderComp/>
      }
      <Row id='cartDiv' >
      {
        movies?.map((item,index)=>(
          <Col className="gutter-row"  span={6} key={index}>
            <Suspense fallback={<h1>Loading</h1>}>
          <MovieCart  {...item} checkRef={checkRef} index={index} />
            </Suspense>
          </Col>
        ))
      }
      </Row>
    </div>
  )
}
 


export default Movies



