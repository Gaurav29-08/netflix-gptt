import { useEffect } from "react";
import {signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
  
    });
  }


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;

        dispatch(addUser({uid:uid,email:email,displayName:displayName,
        photoURL:photoURL,
        }));
        navigate ("/browse")
  
      } else {
        dispatch(removeUser());
        navigate("/")
      

      }
    });

    //unsubscribe when components unmount
    return ()=> unsubscribe();

    

  },[]);

  const handleGptSearchCLick = ()=>{
    dispatch(toggleGptSearchView());
     
  }

  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value))
  
  }




  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img 
      className='w-44'
      src={LOGO} alt='logo' />
      
      {user && (
      <div className='flex p-2'>

        {showGptSearch && ( 
        <select className="p-2 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGES.map((lang)=> (<option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
            ))
            
          }
         
        </select>
        )}

        <button className="py-2 px-4  mx-4 my-2 bg-purple-500 text-white rounded-lg"
        onClick={handleGptSearchCLick} >
        

        {showGptSearch ? "Homepage" : "GPT Search"}
        </button>

        <img 
        className='w-12 h-12'
        alt='usericon' src={user?.photoURL} />

        <button onClick={handleSignOut} className='text-white font-bold'>Sign Out</button>
      </div>
      )}
    </div>
    
  )
}

export default Header
