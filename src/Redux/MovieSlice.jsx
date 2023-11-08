import { createSlice } from "@reduxjs/toolkit";

const initialState={
    movieData:[],
    loading:false,
    error:null,
    isAuth:false
}

const movieSlice=createSlice({
    name:"movies",
    initialState,
    reducers:{
        getMovie: (state,action)=>{
           state.movieData=[...state.movieData,...action.payload]
        },
        loading:(state,action)=>{
            state.loading=action.payload
        },
        error:(state,action)=>{
            state.error=action.payload
        },
        reload:(state,action)=>{
            state.movieData=[]
        },
        authorization:(state,action)=>{
            state.isAuth=action.payload
        }     
    }
})

export {movieSlice}

export const {getMovie,loading,error,reload,authorization}=movieSlice.actions