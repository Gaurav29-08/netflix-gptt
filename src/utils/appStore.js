 import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "./userSlice" 
 import moviesReduces from "./moviesSlice"
 import gptReducer from "./gptSlice";
 import configSlice from "./configSlice";

 const appStore = configureStore(
  {
    reducer:{

      user:userReducer,
      movies: moviesReduces,
      gpt : gptReducer,
      config : configSlice
    }
  }
 );

 export default appStore;