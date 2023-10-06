import './chatSearch.scss';
import search from '../assets/search.svg'
import DmChatUser from './dmChatUser'
import img from "../assets/images/ibnada.jpg"
import { useState } from 'react';
import { Component } from 'react'

const chatSearch = () => {

    const [Found, FoundState] = useState(false);
    const [notFound, notFoundState] = useState(false);
    const [visible, setVisible] = useState(true);

    const removeElement = () => {
        console.log("Remove element is been called");
        setVisible((prev) => !prev);
        FoundState(false);
        notFoundState(false);
      };
    
    const onSubmitHandler = (e:any) => {

        e.preventDefault();
        const searchValue = document.querySelector('.searchBar')?.value;
        if (searchValue == "Ibrahim Nada") {
            FoundState(true);
            notFoundState(false);
        }
        else {
            notFoundState(true);
            FoundState(false);
        }

    }

    return (
    <div className="chatSearchDiv">
        <span>CHAT</span>
            <div className="searchForm">
                <form className="fromClass" onSubmit={onSubmitHandler}>
                    <input type='text' placeholder='Search' className='searchBar'/>
                </form>
            </div>
        <div className="userChat">
            {Found && <div onClick={removeElement}><DmChatUser userName={"Ibrahim Nada"} pic={img}/></div>}
            {notFound && <div onClick={removeElement}><DmChatUser userName={"Not Found"} pic={search}/></div>}
        </div>
    </div>
    )
}
export default chatSearch