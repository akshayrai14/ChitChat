import { useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie/cjs/Cookies';
import EnterRoom from './components/EnterRoom';
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';

const cookies = new Cookies();
function App() {
  const [isAuth , setisAuth] = useState(cookies.get("Auth-token"));
  const signuserout = async () =>{
    await signOut(auth);
    cookies.remove("Auth-token");
    setisAuth(false);
    setroom(null);
  };
  //this will check the cookie but when we come back but first time when we login then we can come to this page without refresh so we use setisAuth and upon first login assign setisAuth
  const [room,setroom] =useState(null);
  //if auth token is there in the cookie then user has logged in and cookie was set so isAuth is true
  if(!isAuth){
    return (
      <div className="App">
        <Auth setisAuth={setisAuth}></Auth>
      </div>
    );
  }
  //if Auth done then only this below is rendered else above return works 
  return (
    //if room made then go to room 
    //else ask to create room
    <div>
      {
      room 
      ? 
      (<Chat room={room}></Chat>) 
      : 
      (<EnterRoom room={room} setroom={setroom}></EnterRoom>)
      }
      <div className='sign-out'>
        <button className='signout' onClick={signuserout}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
//yarn add firebase universal-cookies
 