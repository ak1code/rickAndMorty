import React from 'react';
import { Col, Divider, Row,Image ,Typography} from 'antd';
import { Button } from 'antd/es/radio';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../Redux/FavoriteSlice';
import { Link } from 'react-router-dom';





const MovieCart = ({name,image,status,gender,id}) => {

    const dispatch=useDispatch();
    const favorite=useSelector((state)=>state.favorite.favorite);

     

    const handleFav=()=>{
         
        let fav=favorite.filter((el)=>el.id==id);
        
          if(fav.length!==0){
            return alert("allready in favorite")
          }
        let obj={name,image,status,gender,id}

         dispatch(addFavorite(obj))
         alert("added successful to favorite")
    }
    
  return (
    <div className='movieCard' > 
        <Link to={`/productDetail/:${id}`} >
        <Image src={image} />
        <Typography.Title level={3} >{name}</Typography.Title>
        <Typography.Title level={5}>Status:{status}</Typography.Title>
        <Typography.Title level={5}>Gender:{gender}</Typography.Title>
        </Link>
        <Button onClick={handleFav}>Add to Favorite</Button>
    </div>
  )
}

export default MovieCart