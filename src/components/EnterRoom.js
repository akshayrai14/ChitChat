import React, { useRef, useState } from 'react'
import './EnterRoom.css'
function EnterRoom({room,setroom}) {
    const roomInputRef = useRef(null);
    //actually we had to do this because we can only enter the room when room variable is set to something and this is one way to do that onclick
    //onChange would enter into room instantly but we don't want that , we want user to enter full room name
  return (
    <div class="enter-room-container">
  <label class="enter-room-label">Enter Room Name:</label>
  <input class="enter-room-input" ref={roomInputRef} placeholder='Enter any Name to create New Room (Any VRO knows which room to enter:lowercase)' data-tooltip="Type the name of the room"></input>
  <button class="enter-room-button" onClick={() => setroom(roomInputRef.current.value)}>Enter Chat</button>
</div>

  )
}

export default EnterRoom
