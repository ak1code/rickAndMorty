import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./MovieSlice";
import { counterSlice } from "./CounterSlice";
import { favoriteSlice } from "./FavoriteSlice";

const store=configureStore({
    reducer:{
        movie:movieSlice.reducer,
        counter:counterSlice.reducer,
        favorite:favoriteSlice.reducer
    }
})

export  {store}