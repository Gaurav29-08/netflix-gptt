import {  createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";
import React from 'react'
import Header from './Header'
import { useState,useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { auth } from "../utils/firebase";

import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVTAR } from "../utils/constants";



const Login = () => {

  const [isSignInForm,setIsSignInForm] = useState(true);

  const [errorMessage,setErrorMessage]=useState(null);


  const dispatch = useDispatch();

const name = useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const handleButtonClick = ()=>{
    const message = checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
   


   if(message) return;

    if(!isSignInForm) {
      //sign up logic
     
      createUserWithEmailAndPassword(
        auth,
         email.current.value,
         password.current.value)
        .then((userCredential) => {
        
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVTAR
          }).then(() => {

            const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,
        photoURL:photoURL,
        })
              
            );
             
            
          }).catch((error) => {
            setErrorMessage(error.message);

          
          });           
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    }


    else{
      //sign in logic 
     
signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
  
    const user = userCredential.user;

  
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(`${errorCode} - ${errorMessage}`);
  });
    }



  };

  const toggleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm);
  }


  return (
    <div>
    <Header />
    <div className='absolute'>
    <img src='https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='logo' />

    </div>

    <form onSubmit={(e)=> e.preventDefault() }  className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80' >

      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

      {!isSignInForm && <input
      ref={name}
      type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />}

    <input 
    ref={email}
    type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />

        <input 
        ref={password}
        type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />

        <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>

        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className='py-6 p-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
    </form>
    </div>
  );
};

export default Login
