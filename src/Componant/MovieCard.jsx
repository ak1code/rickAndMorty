import React, { useEffect, useMemo, useState } from 'react';
import { Col, Divider, Row,Image ,Typography, Checkbox, Form} from 'antd';
import { Button } from 'antd/es/radio';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite,  removeFavorite } from '../Redux/FavoriteSlice';
import { Link } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';
import { FiHeart } from "react-icons/fi";
import { check, checkFalse, removeMovie, resetData } from '../Redux/MovieSlice';


let checkArray=[];


const MovieCart = ({name,image,status,gender,id,isCheck,checkRef,index}) => {
// console.log("🚀 ~ file: MovieCard.jsx:16 ~ MovieCart ~ index:", index)

    const dispatch=useDispatch();
    const favorite=useSelector((state)=>state.favorite.favorite);
   
   

     const [show,setshow]=useState(false)
     let obj={name,image,status,gender,id,isCheck}

  

  
      
    const handleFav=()=>{
         
        let fav=favorite.filter((el)=>el.id==id);
        
          if(fav.length!==0){
            return alert("allready in favorite")
          }
        
         dispatch(addFavorite(obj))
         setshow(true)
         dispatch(removeMovie(id))
    }

    
    
     const handleRemove=()=>{
           setshow(false)
         dispatch(removeFavorite(id))
     }

      const handleSelect=(e)=>{
        

         if(e.target.checked==true){
           
               dispatch(check(index))
               checkArray.push(obj)
               checkRef.current=[...checkArray]
               console.log("current",checkRef);
         }else{
       
           dispatch(checkFalse(id));
           checkArray=checkArray.filter((obj)=>obj.id!==id);
             checkRef.current=[...checkArray]
         }
         
      }
      
     const memorizedContent= useMemo(()=>{
             
       return <div className='movieCard' > 
      <Link to={`/productDetail/:${id}`} >
      <Image preview={false} src={image} />
      <Typography.Title level={3} >{name}</Typography.Title>
      <Typography.Title level={5}>Status:{status}</Typography.Title>
      <Typography.Title level={5}>Gender:{gender}</Typography.Title>
      </Link>
        <div id='favbutton'>
        <Button onClick={handleFav}>Add to Favorite</Button>
        {/* {
          show? ( <FiHeart id='fav' onClick={handleRemove}/>):(<FiHeart id='fav1' onClick={handleFav}/>)
        } */}
        
          <Checkbox checked={isCheck} onChange={handleSelect}>{isCheck? "Selected": "Select"}</Checkbox>
      
        </div>
     </div>
     },[name, image, status, gender, id, isCheck])


   return ( memorizedContent)
    
}

export default MovieCart