import { createSlice } from "@reduxjs/toolkit";

const initialState={
    movieData:[],
    loading:false,
    error:null,
    isAuth:false,
    
}


const movieSlice=createSlice({
    name:"movies",
    initialState,
    reducers:{
        getMovie: (state,action)=>{  
            state.movieData.push(...action.payload)
            
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
        },
        removeMovie:(state,action)=>{
            state.movieData=state.movieData.filter((el)=>el.id!==action.payload)
        },
        addMovie:(state,action)=>{
            state.movieData=[...state.movieData,action.payload]
        },
        check:(state,action)=>{
           
            
            console.log("🚀 ~ file: MovieSlice.jsx:50 ~ action.payload:", action.payload)
              state.movieData[action.payload].isCheck=true
             
        },
        checkFalse:(state,action)=>{
    

            const index=state.movieData.findIndex((obj)=>obj.id==action.payload);
              state.movieData[index]={...state.movieData[index],isCheck:false}
        },
        removeCheckedMovie:(state,action)=>{
              state.movieData=[...action.payload]
        },
        resetData:(state,action)=>{
              state.movieData=state.movieData.map((el)=>{
                      return {...el,isCheck:false}
              })
              console.log("clicked after data",state.movieData)
        }       
    }
})

export {movieSlice}

export const {getMovie,loading,error,reload,authorization,removeMovie,check,checkFalse,removeCheckedMovie,resetData}=movieSlice.actions