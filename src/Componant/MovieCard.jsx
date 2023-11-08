import React from 'react';
import { Col, Divider, Row,Image ,Typography} from 'antd';

const Title={Typography};


const MovieCart = ({name,image,status,gender}) => {
  return (
    <div className='movieCard' >
        <Image src={image} />
        <Typography.Title level={3} >{name}</Typography.Title>
        <Typography.Title level={5}>Status:{status}</Typography.Title>
        <Typography.Title level={5}>Gender:{gender}</Typography.Title>
    </div>
  )
}

export default MovieCart