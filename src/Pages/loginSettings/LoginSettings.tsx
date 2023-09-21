import { useState } from "react";
import "./LoginSettings.scss"
import appel from './assets/appel.jpg';
import axios from "axios";



const Avatars = () => {

    const handleClick = () => {
        console.log(this);
    }

    return (
        <>
        <div onClick={handleClick} className="avatars">
            <img src={appel}/>
            <img src={appel} />
            <img src={appel} />
        </div>
        <div className="avatars">
            <img src={appel} />
            <img src={appel} />
            <img src={appel} />
        </div>
        </>
    );
};




// class testinginteface implements test{
    
    //     constructor(){}
    //     public print() : string{
        //         console.log("sss");
        
        //         return "h";
        //     }
        // }
        
export default function LoginSettings() {
    
    const retrieveData = () => {
        const avatarInput : string = document.querySelector('[name="avatarUpload"]').value;
        const nicknameInput : string  = document.querySelector('[name="nickname"]').value;
        if (nicknameInput && avatarInput) 
        {
            console.log("Nickname: ", nicknameInput);
            console.log("Avatar: ", avatarInput);
            const payloadName = {
                username: nicknameInput,
            };
            const payloadAva = {
                file: avatarInput
            };
            axios.post('http://localhost:3000/auth/signup-success', payloadName, { withCredentials: true })
            .then((response) =>
                console.log(response))
            .catch((error) =>
                console.log(error));

            axios.post('http://localhost:3000/auth/uploads', payloadAva, { withCredentials: true })
            .then((response) =>
                console.log(response))
            .catch((error) =>
                console.log(error));
        }
        else
            console.log("No Credentials :(")
    }

    return (
        <div className="container">
            <div className="settingsBox">
                <div className="header">Settings</div>
                <div className="content">
                    <div>
                        <div className="nes-field">
                            <input type="text" name="nickname" className="nes-input" placeholder='Choose Nickname'/>
                        </div>
                        <div className="choosingAvatarContainer">
                            <span className="is-primary">Choose Avatar</span>
                        </div>
                            <Avatars />
                        <div className="uploadContainer">
                            <input formMethod="post" type="file" name="avatarUpload" accept=".png, .jpg, .jpeg" />
                        </div>
                        <div className="startContainer">
                            <a onClick={retrieveData} className="nes-btn">Start</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}