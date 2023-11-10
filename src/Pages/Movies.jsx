import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCart from '../Componant/MovieCard';
import { Col, Divider, Row,Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, loading,error, reload, removeCheckedMovie, resetData } from '../Redux/MovieSlice';
import {Suspense, lazy} from "react"
import LoaderComp from './LoaderComp';
import { movetofav } from '../Redux/FavoriteSlice';
import { useNavigate } from 'react-router-dom';




const Movies = () => {

  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  
  const navigate=useNavigate();
  
  const dispatch=useDispatch();
  const movies=useSelector((state)=>state.movie.movieData);
  const favData=useSelector((state)=>state.favorite.favorite);
  const loadingMovie=useSelector((state)=>state.movie.loading);
  const checkbox=useSelector((state)=>state.favorite.checkbox);
  

  

  useEffect(()=>{
   
      GetData()
    
  },[page]);

  
  
  
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
     
     let favID=new Set(favData.map((obj)=>obj.id));
     const uniqueItems = checkbox.filter(obj => !favID.has(obj.id));
    //  console.log("id of favrite",uniqueItems)
      dispatch(movetofav(uniqueItems));

      const CheckID = new Set(checkbox.map(obj => obj.id));

      const postItems=movies.filter(obj=>!CheckID.has(obj.id));
        
       dispatch(removeCheckedMovie(postItems))  
       dispatch(resetData())

  }
  
   
  return (
    <div>
      <h1 className='heading'>Movies</h1>
      {checkbox.length!==0 && <Button onClick={moveFavorite}>add to favorite</Button>}
      {
        loadingMovie && <LoaderComp/>
      }
      <Row >
      {
        movies?.map((item,index)=>(
          <Col className="gutter-row"  span={6} key={index}>
            <Suspense fallback={<h1>Loading</h1>}>
          <MovieCart  {...item}  />
            </Suspense>
          </Col>
        ))
      }
      </Row>
    </div>
  )
}
 


export default Movies



