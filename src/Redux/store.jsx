import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./MovieSlice";
import { counterSlice } from "./CounterSlice";

const store=configureStore({
    reducer:{
        movie:movieSlice.reducer,
        counter:counterSlice.reducer
    }
})

export  {store}