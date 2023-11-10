import React, { useEffect, useState } from 'react';
import { Col, Divider, Row,Image ,Typography, Checkbox, Form} from 'antd';
import { Button } from 'antd/es/radio';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, checkboxData, removeCheckbox, removeFavorite } from '../Redux/FavoriteSlice';
import { Link } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';
import { FiHeart } from "react-icons/fi";
import { check, checkFalse, removeMovie } from '../Redux/MovieSlice';
// import { CheckboxChangeEvent } from 'antd/es/checkbox';



const MovieCart = ({name,image,status,gender,id,isCheck}) => {

    const dispatch=useDispatch();
    const favorite=useSelector((state)=>state.favorite.favorite);
    const checkbox=useSelector((state)=>state.favorite.checkbox);
   

     const [show,setshow]=useState(false)
     let obj={name,image,status,gender,id,isCheck}

    


  
      
    const handleFav=()=>{
         
        let fav=favorite.filter((el)=>el.id==id);
        
          if(fav.length!==0){
            return alert("allready in favorite")
          }
        
         dispatch(addFavorite(obj))
         setshow(true)
        //  alert("added successful to favorite")
         dispatch(removeMovie(id))
    }

    
    
     const handleRemove=()=>{
           setshow(false)
         dispatch(removeFavorite(id))
     }

      const handleSelect=(e)=>{
         console.log(e.target.checked,`${id}`)
         if(e.target.checked==true){
             dispatch(checkboxData(obj));
              dispatch(check(id))
              // dispatch(check(id))
             console.log(checkbox,"checkbox")
         }else{
          dispatch(removeCheckbox(id))
           dispatch(checkFalse(id))
         }
         
      }
      
    
  return (
    <div className='movieCard' > 
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
  )
}

export default MovieCart