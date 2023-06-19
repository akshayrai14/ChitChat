import React from 'react'
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import Cookies from 'universal-cookie/cjs/Cookies';
const cookies = new Cookies();
function Signout(props) {
    const {room,isAuth,setroom,setisAuth} =props;
    const signuserout = async () =>{
        await signOut(auth);
        cookies.remove("Auth-token");
        setisAuth(false);
        setroom(null);
      };
  return (
    <button onClick={signuserout}>Sign Out</button>
  )
}

export default Signout
