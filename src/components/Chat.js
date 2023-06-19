import React, { useEffect, useState } from 'react'
import { addDoc, collection ,onSnapshot,orderBy,query,serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import './Chat.css'
import Signout from './Signout';
function Chat(props) {
    const {room} = props;
    const [msg,setmsg] = useState([]);
    const [newmessage,setnewmessage] = useState("");
    const messageRef = collection(db,"Messages");
    useEffect(()=>{
        //on Update the useEffect must fetch data and show here with this query which will run in collectn
        const querymsg = query(messageRef,where("myroom","==",room),orderBy("createdAt"));
        //callback function below inside onSnapshot will run everytime there is a change in the querymsg
        const unsubscribe= onSnapshot(querymsg,(snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id: doc.id});
                //our doc not has any id but our doc has
            });
            setmsg(messages);
        });
        return () => unsubscribe();
        //clean the useEffect it can cause leak
    },[]);
    const handleSubmission = async (e) =>{
        e.preventDefault();//prevent page from reload
        //console.log(newmessage);
        if(newmessage === "")return;
        // whenever DB involved async done
        //this will add the message to the collection which is referenced with messageRef above
        await addDoc(messageRef,{
            text : newmessage,
            createdAt : serverTimestamp(),
            user : auth.currentUser.displayName,
            myroom : room,
        });
        //value of the input needs to be emptied after message send
        setnewmessage("");
    };
  return (
    <div className='chat-app'>
        <div className='header'>
            Welcome to :{room.toUpperCase()}
        </div>
        <div className='messages'>
            {msg.map((m)=>(
                <div className='message' key={m.id}>
                <span className='user'>
                    {m.user}
                </span>
                <span className='text'>{m.text}</span>
                <span className='time'>{m.createdAt?.toDate().toLocaleTimeString()}</span>
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmission}className='new-message-form'>
            <input 
            placeholder='Type your message here' className='new-message-input'
            onChange={(e)=>setnewmessage(e.target.value)}
            value={newmessage}
            ></input>
            <button className='send-button'
            type='submit'>Send</button>
        </form>
    </div>
  )
}

export default Chat
