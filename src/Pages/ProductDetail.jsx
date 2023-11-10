import useSelection from 'antd/es/table/hooks/useSelection';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { error, loading } from '../Redux/MovieSlice';
import axios from 'axios';
import { Button, Image, Typography,Space } from 'antd';
import { addFavorite, removeFavorite } from '../Redux/FavoriteSlice';

const ProductDetail = () => {
     let {id}=useParams();
      const [data,setData]=useState([]);
     const dispatch=useDispatch()

     const fav=useSelector((state)=>state.favorite.favorite);
      
      
 
     const {Text}=Typography

      useEffect(()=>{
          getDetail()
      },[])
      
       let productid=id.replace(':', '');
       console.log(productid)
    
     let  favproduct=fav.filter((el)=>el.id==productid);

      const getDetail=async()=>{
        dispatch(loading(true))
        try {
          let res=await axios.get(`https://rickandmortyapi.com/api/character/${productid}`)
          
                console.log(res.data)
           setData(res.data)
  
            dispatch(loading(false))
             
        } catch (err) {
           console.log(err)
           dispatch(loading(false))
           dispatch(error)
        }
      }
       console.log(data)

      

  return (
    <div className='productDetail'>
        <Image src={data.image} /> 
        <Typography.Title level={3} >{data.name}</Typography.Title>
        <Typography.Title level={5}>Status:{data.status}</Typography.Title>
        <Typography.Title level={5}>Gender:{data.gender}</Typography.Title>
        <Space direction='vertical'>
        <Text>Location:-{data.location?.name}</Text>
        <Text>BirthDate:-{data.created}</Text>
        <Text>Species:-{data.species}</Text>
        </Space>
        {
            favproduct.length==0? (<Button onClick={()=>dispatch(addFavorite(data))}>Add to fav</Button>):(<Button onClick={()=>dispatch(removeFavorite(data.id))}>Remove from Fav</Button>)
        }
        
        </div>
  )
}

export default ProductDetail