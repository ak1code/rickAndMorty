import { createSlice } from "@reduxjs/toolkit";

const initialState={
    favorite:[],
    checkbox:[],
};


const favoriteSlice=createSlice({
    name:"favorite",
    initialState,
    reducers:{
        addFavorite:(state,action)=>{
            console.log(action.payload)
            state.favorite=[...state.favorite,action.payload]
            
        },
        removeFavorite:(state,action)=>{
            state.favorite=state.favorite.filter((el)=>el.id!==action.payload)
            console.log(action.payload)
        },
        checkboxData:(state,action)=>{
            console.log("checkbox action",action.payload)   
            state.checkbox=[...state.checkbox,action.payload]
            console.log(state.checkbox)
           
        },
        removeCheckbox:(state,action)=>{
             state.checkbox=state.checkbox.filter((el)=>el.id!==action.payload);
            //  state.checkbox=[]
        },
        movetofav:(state,action)=>{
             state.favorite=[...state.favorite,...action.payload];
             state.checkbox=[]
        }
        
    }

})

export {favoriteSlice}
export const  {addFavorite,removeFavorite,checkboxData,removeCheckbox,movetofav}=favoriteSlice.actions