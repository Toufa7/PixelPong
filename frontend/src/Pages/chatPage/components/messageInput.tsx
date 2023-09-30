import Send from '../../../assets/images/send.svg'
import '../chatPage.scss'
import { useState, useRef } from 'react'
import io from 'socket.io-client';
// import axios from 'axios';



const messageInput = (props: any) => {
  const firstRef = useRef(null);
  const [input, setInput] = useState('');

  const onSubmitHandler = (e: any) =>{
    e.preventDefault();
    const message = document.querySelector('.messageInputBox').value;
    if (message != '')
    {
      console.log('MSG: ', message);
      props.onMessageInput(message);
      firstRef.current.value = '';
    }
    // const endpnt = "https://dummyapi.io/data/v1/user?created=1"
    // axios.get(endpnt, message)
    // .then((res) =>{
    //   console.log("Respon -> " ,res);
    // })
    // .catch((err) =>{
    //   console.log(err);
    // })
  }

  return (
    <div className="messageInput">
      <form className='messageform' onSubmit={onSubmitHandler}>
        <input className='messageInputBox' ref={firstRef} placeholder='Type your message here ...'></input>
        <button className='sendButton'><img src={Send} type="submit" ></img></button>
      </form>
    </div>
  )
}

export default messageInput