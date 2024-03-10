import React, { useEffect, useMemo, useState } from "react";
import {io} from 'socket.io-client'
// import {Container, Button, TextField, Typography} from "@mui/material";
import styles from './App.module.css'
import { style } from "@mui/system";

const App =() =>{
  const socket = useMemo(()=>io('http://localhost:3000'),[])

  const [message, setMessage] = useState("")
  const [socketId, setSocketId] = useState("")
  const [messages, setMessages] = useState([])
  console.log(messages  )
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message)
    setMessage("");
  }
  useEffect(()=>{
    socket.on('connect', ()=>{
      setSocketId(socket.id)
      console.log("user connected")
    })
    socket.on("receive-message", (data) => {
      console.log(data)
      setMessages(()=> [...messages, data])
    })
    socket.on("welcome", (s)=>{
      console.log(s)
    })
    return () => {
      socket.disconnect();
    };
  }, [])
  return (
    <>
    <div className={styles.container} maxWidth="sm">
      <div className={styles.logoImg}></div>
      <div className={styles.messageContainer}>
        {messages.map((m, i)=>(
          <p className={styles.messageLeft} key={i}>{m}</p>
        ))}
        {/* <div className={styles.messageRight}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div> */}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input value={message} className={styles.messageInput}
        onChange={e=> setMessage(e.target.value)} id="messageInput"/>
        <button type="submit" className={styles.sendBtn}></button>
      </form>
    </div>
        </>
  )
}
export default App;