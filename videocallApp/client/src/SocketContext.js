import React, { useState, useEffect, createContext, useRef } from 'react'
import { io } from "socket.io-client"
import Peer from 'simple-peer'
const Socketcontext = createContext()
const socket = io('http://localhost:3001')
const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState(null)
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const[name,setName]=useState('')
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
          
            setStream(currentStream)
            if (myVideo.current) 
    {
        myVideo.current.srcObject = currentStream;
    }
        })
        socket.on('me', (id) => {
            setMe(id)
        })
        socket.on('calluser', ({ from, name:callerName, signal }) => {
            
            setCall({ isReceivedCall: true, from, name: callerName, signal })
            console.log("kakkakkaak",signal);
        })
    }, [])

 

    const answerCall = () => {
  console.log("evdaer");
        setCallAccepted(true)
        
        const peer = new Peer({ initiator: false, trickle: false, stream })
        console.log("hellooo stream",stream);
        peer.on('signal', (data) => {
            console.log("signal data",data);
            socket.emit('answercall', { signal:data, to:call.from })
        })
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
       
         })
        console.log("akkru",call);
        peer.signal(call.signal)
        connectionRef.current = peer 

    }
    const callUser = (id) => {
       
        const peer = new Peer({ initiator: true, trickle: false, stream })
        peer.on('signal', (data) => {
            console.log("wow",id,data,me,name);
            socket.emit('calluser', {userToCall:id,signalData:data,from:me,name})
        })
        peer.on('stream', (currentStream) => {
                console.log("current stream",currentStream);
                userVideo.current.srcObject = currentStream;
            

        })
        socket.on('callaccepted',(signal)=>{
            console.log("call accepted",signal);
          setCallAccepted(true)
         
          peer.signal(signal)
        })
        connectionRef.current = peer

    }
        
    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy();
        window.location.reload()

    }
    return(
        <Socketcontext.Provider value={{
            call,callAccepted,myVideo,userVideo,stream,name,setName,callEnded,me,callUser,leaveCall,answerCall
        }}>
         {children}
        </Socketcontext.Provider>
    )
}
export { ContextProvider,Socketcontext};