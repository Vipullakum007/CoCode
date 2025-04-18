import React, { useEffect, useState } from 'react';
import './FeaturesPage.css';
import { LuSendHorizonal } from "react-icons/lu";
import { useAuth } from '../store/auth';
import { useRoom } from '../context/roomContext/roomContext';
import { toast } from 'react-toastify';
const Chat = ({socket}) => {
    console.log(socket)
    const authContext = useAuth()
    const roomContext = useRoom()
    const [text, setText] = useState("");
    const [messages , setMessages] = useState([])
    useEffect(()=>{
        console.log("Registering receive-message event listener");
        socket.on("receive-message",(obj)=>{
            console.log(obj)
      	    setMessages((prevMessages) => [...prevMessages, {
            text : obj.newmsg.text,
            username : obj.newmsg.username
        }]);
       // Update room context state as well
       roomContext.dispatch({
        type: 'ADD_MESSAGE',
        payload:obj.newmsg,
        });
      })
      return() => {
        console.log("event listner is removed")
        socket.off("receive-message")
      }
    },[socket])

     // handle sent message 
     const sendMessage = () => {
        if(!text){
            toast.error("Message can not be empty");
            return;
        }
      setMessages((prevMessages) => [...prevMessages, {
        text : text,
        username : authContext.loggedInUser.username
      }]);
      roomContext.dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            text : text,
            username : authContext.loggedInUser.username
          },
      });
       socket.emit("send-message",
	{ newmsg : 
		{ text : text , 
		  username : authContext.loggedInUser.username
		},
		roomId: roomContext.roomState.roomId 
	});
       setText('')
    };
  
    return (
        
          <>
                <h2>Group Chat</h2>
                <h3>{authContext.loggedInUser.username}</h3>
                <hr />
                <div className="chat-block">
                    {roomContext.roomState.messages.map((msg, index) => (
                        <div key={index} style={{
                            textAlign: msg.username === authContext.loggedInUser.username ? "left" : "right"
                          }} className='textMsg'>
                            <strong>{msg.username}</strong>: {msg.text}
                        </div>
                    ))}
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your message..."
                        autoFocus
                    />
                    <LuSendHorizonal onClick={sendMessage} />
                </div>
                </>
       
    );
};

export default Chat;
