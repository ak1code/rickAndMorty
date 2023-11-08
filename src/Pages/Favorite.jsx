import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography ,Image,Button} from 'antd';
import "../App.css"
import { removeFavorite } from '../Redux/FavoriteSlice';

const Favorite = () => {
     const favorite=useSelector((state)=>state.favorite.favorite);
     const dispatch=useDispatch();
     console.log(favorite)

    

  return (
    <div>
        <Typography.Title level={1}>Favorite</Typography.Title>
        {
            favorite?.map((item)=>{
                 return (<div className='movieCard' key={item.id}>
                       <Image src={item.image} />
                       <Typography.Title level={3} >{item.name}</Typography.Title>
                       <Typography.Title level={5}>Status:{item.status}</Typography.Title>
                       <Typography.Title level={5}>Gender:{item.gender}</Typography.Title>
                       <Button onClick={()=>dispatch(removeFavorite(item.id))} >Remove from Favorite</Button>                
                 </div>)    
            })
        }
    </div>
  )
}

export default Favorite