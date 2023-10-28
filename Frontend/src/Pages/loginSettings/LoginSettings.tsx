import "./LoginSettings.scss"

/******************* Packages  *******************/
import {Toaster, toast } from 'react-hot-toast';
import axios from "axios";
import { useEffect, useState } from "react";
import Anime from 'react-anime';
import { Link } from "react-router-dom";

/******************* Includes  *******************/

const RetrieveCheckSendData =  () => {
    const avatar        = document.querySelector('[name="avatarUpload"]')?.files[0];
    const nicknameInput = document.querySelector('[name="nickname"]')?.value;
    const usernameCheck = /^[A-Za-z0-9_]{5,15}$/;
    if (avatar) {
        const data = new FormData();
        data.append('file', avatar);
        toast.promise(
            axios.post('http://localhost:3000/auth/uploads', data, { withCredentials: true })
            .then((responseNickname) => {
                console.log(responseNickname);
            }),
            {
                loading: "Sending data...",
                success: "Avatar Uploaded!", 
                error: "An error occurred",
            }
        ,{ duration: 5000, position: 'top-right' });           
    }
    if (usernameCheck.test(nicknameInput)) {
        toast.promise(
            axios.post('http://localhost:3000/auth/updateprofil', { username: nicknameInput }, { withCredentials: true })
            .then((responseNickname) => {
                console.log(responseNickname);
             }),
             {
                loading: "Sending data...",
                success: "Username Changed!",
                error: "An error occurred",
             }
             ,{ duration: 5000, position: 'top-right' });           
    }
    else if (!nicknameInput){
        toast("Please Provide Name", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
    }
    else if (!usernameCheck.test(nicknameInput))
    {
        toast.error("Invalid Username", { style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
    }
    else {
        toast("Choose an avatar", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
    }
}

export default function LoginSettings() {   
    const [isChecked, set2FAStatus] = useState(false);
    const handle2FAChange = () => {
        set2FAStatus(!isChecked);
        const endpoint = isChecked ? "http://localhost:3000/auth/2fa/disable" : "http://localhost:3000/auth/2fa/enable";
        const status = isChecked ? 1 : 0;
        axios.put(endpoint, status, { withCredentials: true }) 
        .then (() => {})
        .catch(() => {});
    }
	const [update , setUpdate] = useState("");
    const [imagePreview, setImagePreview] = useState('');
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        }
    }

    const [userInfo, setUserInfo] = useState("");
    useEffect(() => {
        const fetchData = () => {
            axios.get("http://localhost:3000/users/profil", { withCredentials: true })
            .then((response) => {
                setUserInfo(response.data)
            })
            .catch((error) => {
            console.log("Error -> ", error);
        })
    }
    fetchData();
    }, []);

    console.log("userInfo -> ", userInfo);
    return (
        <div style={{height: '100vh'}}>
            <Toaster/>
          <div className="container">
            <div className="settingsBox">
                <div className="header">Settings</div>
                <div className="content">
                    <div>
                        <div className="nes-field">
                            <input onChange={(e) => setUpdate(e.target.value)} type="text" name="nickname" className="nes-input" required placeholder="Choose a nickname"/>
                        </div>
                        <div className="choosingAvatarContainer">
                        </div>
                            <div className="uploadContainer">
                                <div>
                                    <img src={imagePreview} alt="Preview" style={{width: '100px', height: '100px', borderRadius: '50px'}}/>
                                </div>
                                <label className="nes-btn">Upload your image
                                    <input onChange={handleImageChange} formMethod="post" type="file" alt="Upload your avatar" name="avatarUpload" accept="image/*"/>
                                </label>
                            </div>

                        <div className="twoFa" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ textAlign: 'left' }}>2FA</label>
                        <label style={{ textAlign: 'right' }}>
                            <input type="checkbox" className="nes-checkbox" checked={isChecked} onChange={handle2FAChange}/>
                            <span>{isChecked ? 'Enabled' : 'Disabled'}</span>
                        </label>
                     </div>
                        <div className="startContainer">
                            <button style={{width: 'fit-content'}} onClick={() => {
                                if (!document.querySelector('[name="avatarUpload"]')?.files[0] && !document.querySelector('[name="nickname"]')?.value && userInfo.firstlogin == true) {
                                    document.getElementById('warning')?.showModal();
                                }
                                else {
                                    RetrieveCheckSendData();
                                }
                                }} className={`nes-btn  ${update ? "is-success" : "is-disabled"}`}>Update
                            </button>
                        </div>
                    </div>
                    {/* A dialog show up for the 1st time and ask the user if he want to go with the default username & avatar */}
                    <section>
                        <dialog style={{background: '#DDFFFF', width: '600px'}} className="nes-dialog is-rounded" id="warning">
                            <form method="dialog">
                                <p className="title">Warning</p>
                                <p>Do you want to go with the default settings?</p>
                                <Anime translateY={['-100%', '0%']} duration={3000}>
                                    <div>
                                        <img style={{width: '100px', height: '100px', borderRadius: '50%', margin: '10px'}} src={`http://localhost:3000/auth/avatar/default-image`}></img>
                                        <a style={{fontWeight: "bold"}}>{userInfo.username}</a>
                                    </div>
                                </Anime>
                                <div>
                                    <button style={{margin: '10px'}} className="nes-btn">Cancel</button>
                                    <Link to="/home">
                                    <a style={{margin: '10px', color: 'black'}} className="nes-btn is-primary">Confirm</a>
                                    </Link>
                                </div>
                            </form>
                        </dialog>
                    </section>

                </div>
            </div>
        </div>
        </div>
    );
    }
