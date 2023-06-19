import React from 'react'
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
import './Auth.css'
function Auth(props) {
    const { setisAuth } = props;
    //object destructuring
    const cookies =new Cookies();
    const signinwithGoogle = async () =>{
        //async function always which not executes until signIN await is ok
        try{const result = await signInWithPopup(auth,provider);
        //to keep the user logged in even when refresh or leave 
        //create a cookie and associate it with user
        //cookie name can be anything
        cookies.set("Auth-token",result.user.refreshToken);
        setisAuth(true);}
        catch(err){
            console.log(err);
        }
    };
  return (
    <div className='pagedive'>
      <div lclassName='texti'>Sign in With Google To Continue</div>
      <button className='s-button' onClick={signinwithGoogle}>Sign in With Google</button>
    </div>
  )
}

export default Auth
