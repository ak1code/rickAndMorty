
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from '../Redux/CounterSlice';

const Counter = () => {

    const dispatch=useDispatch();
    const count=useSelector((state)=>state.counter.count);
   

  return (
    <div>
        <h1>{count}</h1>
        <button onClick={()=>dispatch(increment())}>Inc</button>
        <button onClick={()=>dispatch(decrement())}>Dec</button>
        <button onClick={()=>dispatch(reset())}>Reset</button>
        <button onClick={()=>dispatch(incrementByAmount(10))}>Inc Amout</button>
    </div>
  )
}

export default Counter