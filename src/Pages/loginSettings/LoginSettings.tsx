
// @ts-nocheck
import "./LoginSettings.scss"

/******************* Packages  *******************/
import {Toaster, toast } from 'react-hot-toast';
import axios from "axios";
import { useState } from "react";
/******************* Includes  *******************/
import img3 from './assets/FarmerBoy.png';
import img2 from './assets/Detective.png';
import img1 from './assets/Glasses.png';
import img4 from './assets/Lady.png';
import img5 from './assets/old_man.png';
import img6 from './assets/Girl2.png';
import NavBar from "../addons/NavBar";

const retrieveCheckSendData = () => {
    const avatar = document.querySelector('[name="avatarUpload"]').files[0];
    const nicknameInput = document.querySelector('[name="nickname"]').value;
    const usernameCheck = /^[A-Za-z0-9_]{5,15}$/;

    if (avatar && usernameCheck.test(nicknameInput)) {
        const data = new FormData();
        data.append('file', avatar);
        toast.promise(
            axios.all([
                axios.post('http://localhost:3000/auth/signup-success', { username: nicknameInput }, { withCredentials: true }),
                axios.post('http://localhost:3000/auth/uploads', data, { withCredentials: true })
            ]).then(axios.spread((responseNickname, responseAvatar) => {
                console.log(responseNickname, responseAvatar);
            })),
            {
                loading: "Sending data...",
                success: "Success Settings!",
                error: "An error occurred",
            }
        );
            
    }
    else if (!usernameCheck.test(nicknameInput))
        toast.error("Invalid Username");
    else {
        toast.error('Choose an avatar');
    }
}

const Avatars = () => {
    const handleClick = (idx : number) => {
        const avatars = [{img1}.img1,{img2}.img2,{img3}.img3,{img4}.img4,{img5}.img5,{img6}.img6];
        console.log("Avatar Seleted: " , avatars[idx])
    }

    return (
        <>  
        <div className="avatars">
            <img onClick={() => handleClick(0)} src={img1}/>
            <img onClick={() => handleClick(1)} src={img2} />
            <img onClick={() => handleClick(2)} src={img3} />
        </div>
        <div className="avatars">
            <img onClick={() => handleClick(3)} src={img4} />
            <img onClick={() => handleClick(4)} src={img5} />
            <img onClick={() => handleClick(5)} src={img6} />
        </div>
        </>
    );
};

const Toasts = () => {
    return (
        <Toaster
            reverseOrder={false}
            position='top-right'
            toastOptions={{
                style: {
                    borderRadius: '8px',
                    background: '#AC8FB4',
                    color: '#fff'
                },
            }}
        />
    );
}

export default function LoginSettings() {   
    const [isChecked, set2FAStatus] = useState();
    console.log("Initial Status -> ",isChecked);
    const handle2FAChange = () => {
        set2FAStatus(!isChecked);
        const endpoint = isChecked ? "http://localhost:3000/auth/2fa/disable" : "http://localhost:3000/auth/2fa/enable";
        const status = isChecked ? 1 : 0;
        axios.put(endpoint, status, { withCredentials: true }) 
        .then ((response) => {
            console.log("2FA Status " , response.data.status);
        }).catch((error) => {
            console.log(error);
        });
    }   
    const dialogPlease = () => {
        const dialogElement = document.getElementById('dialog-default');
        dialogElement.showModal();
      };
      
      return (
          <div className="container">
            <div className="settingsBox">
                <div className="header">Settings</div>
                <div className="content">
                    <div>
                        <div className="nes-field">
                            <input type="text" name="nickname" className="nes-input" required placeholder='Choose Nickname'/>
                        </div>
                        <div className="choosingAvatarContainer">
                            <span className="is-primary">Choose Avatar</span>
                        </div>
                            <Avatars />
                        <div className="uploadContainer">
                            <label className="nes-btn">
                                <input formMethod="post" type="file" name="avatarUpload" accept=".png, .jpg, .jpeg" />
                                <span>Upload your avatar</span>
                            </label>
                        </div>
                        <div className="twoFa" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ textAlign: 'left' }}>2FA</label>
                        <label style={{ textAlign: 'right' }}>
                            <input type="checkbox" className="nes-checkbox" checked={isChecked} onChange={handle2FAChange}/>
                            <span>{isChecked ? '0' : '1'}</span>
                        </label>
                     </div>
                        <div className="startContainer">
                            <Toasts/>
                            <section>
                                <button onClick={dialogPlease} type="button" className="nes-btn">Start</button>
                                <dialog className="nes-dialog" id="dialog-default">
                                    <form method="dialog">
                                        <p className="title">Warning</p>
                                        <p>Do you wanna go with the default</p>
                                        <menu className="dialog-menu">
                                            <button className="nes-btn">Cancel</button>
                                            <button onClick={retrieveCheckSendData} className="nes-btn is-success">Confirm</button>
                                        </menu>
                                    </form>
                                </dialog>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
