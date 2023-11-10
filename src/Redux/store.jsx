import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./MovieSlice";
import { counterSlice } from "./CounterSlice";
import { favoriteSlice } from "./FavoriteSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig={
    key:"root",
    version:1.1,
    storage
}

const reducer=combineReducers({
    movie:movieSlice.reducer,
    counter:counterSlice.reducer,
    favorite:favoriteSlice.reducer
})

const persisReducer=persistReducer(persistConfig,reducer)

const store=configureStore({
    reducer:persisReducer
    
})

export  {store}