import Send from '../../../assets/images/send.svg'
import '../chatPage.scss'
// import axios from 'axios';



const messageInput = (props: any) => {
  const onSubmitHandler = (e: any) =>{
    e.preventDefault();
    const message = document.querySelector('.messageInputBox').value;
    console.log('MSG: ', message);
    props.onMessageInput(message);
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
        <input className='messageInputBox' placeholder='Type your message here ...'></input>
        <button className='sendButton'><img src={Send}></img></button>
      </form>
    </div>
  )
}

export default messageInput