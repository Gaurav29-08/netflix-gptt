 import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "./userSlice" 
 import moviesReduces from "./moviesSlice"

 const appStore = configureStore(
  {
    reducer:{

      user:userReducer,
      movies: moviesReduces,
    }
  }
 )

 export default appStore;