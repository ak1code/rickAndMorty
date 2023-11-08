import { createSlice } from "@reduxjs/toolkit";

const initialState={
    favorite:[]
};


const favoriteSlice=createSlice({
    name:"favorite",
    initialState,
    reducers:{
        addFavorite:(state,action)=>{
            state.favorite=[...state.favorite,action.payload]
        },
        removeFavorite:(state,action)=>{
            state.favorite=state.favorite.filter((el)=>el.id!==action.payload)
            console.log(action.payload)
        }
    }

})

export {favoriteSlice}
export const  {addFavorite,removeFavorite}=favoriteSlice.actions