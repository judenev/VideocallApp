import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { Socketcontext } from '../SocketContext'

const Notifications =() =>{
  const {answerCall,call,callAccepted}=useContext(Socketcontext)
  console.log("bol",call);
  return (
   <>
   {call!=null ? call.isReceivedCall && !callAccepted && (
    <div style={{display:'flesx', justifyContent:'center'}}>
      <h1>{call.name}is Calling</h1>
      <Button 
      variant='contained' color='primary' onClick={answerCall} >
        Answer Call
      </Button>

    </div>
   ):''}
   </>
  )
}

export default Notifications