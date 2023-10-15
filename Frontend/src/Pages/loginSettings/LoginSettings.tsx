import "./LoginSettings.scss"

/******************* Packages  *******************/
import {Toaster, toast } from 'react-hot-toast';
import axios from "axios";
import { useEffect, useState } from "react";
import Anime from 'react-anime';
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";

/******************* Includes  *******************/

const RetrieveCheckSendData =  () => {
    // const [firstTimeLogin, setFristTimeLogin] = useState(false);
    // const cookie = new Cookies();
    // const token = jwt_decode(cookie.get('jwt'));
    // axios.get(`http://localhost:3000/users/${token.id}`, {withCredentials: true})
    // .then((Resepone) => {
    //     setFristTimeLogin(Resepone.data.firstlogin)
    // })
    // .catch((bad )=> {
    //     console.log("first ==+> ", bad);
    // })


    const avatar = document.querySelector('[name="avatarUpload"]').files[0];
    const nicknameInput = document.querySelector('[name="nickname"]').value;
    const usernameCheck = /^[A-Za-z0-9_]{5,15}$/;
    /**
     * TODO: it's optionnaly either nickname or avatar or both
    */
//    const navigate = useNavigate();
   if (avatar) {
       const data = new FormData();
       data.append('file', avatar);
       toast.promise(
           axios.all([
               axios.post('http://localhost:3000/auth/uploads', data, { withCredentials: true })
            ]).then(axios.spread((responseNickname) => {
                console.log(responseNickname);
            })),
            {
                loading: "Sending data...",
                success: "Success Settings!", 
                error: "An error occurred",
            }
            ,{ duration: 5000, position: 'top-right' });           
    }
    else if (usernameCheck.test(nicknameInput)) {
        toast.promise(
            axios.all([
                axios.post('http://localhost:3000/auth/updateprofil', { username: nicknameInput }, { withCredentials: true }),
             ]).then(axios.spread((responseNickname) => {
                 console.log(responseNickname);
             })),
             {
                 loading: "Sending data...",
                 success: "Success Settings!",
                 error: "An error occurred",
             }
             ,{ duration: 5000, position: 'top-right' });           
    }
    else if (!avatar && nicknameInput.length)
    {
        document.getElementById('warning')?.showModal();
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

const Avatars = () => {
    const cookies = new Cookies();
    const logged = cookies.get('jwt');
    const [userData, setUserData] = useState({});
    if (logged)
    {
        const token = jwt_decode(logged);
        useEffect(() => {
            try {
                axios.get(`http://localhost:3000/users/profil`, {withCredentials : true})
                .then((rese) => {
                    console.log("user Data =>  ", rese);
                    setUserData(rese.data)
                })
            }
            catch (error) {
                console.log("Error Catched ", error);
            }
        },[])
    }
};


export default function LoginSettings() {   
    const [isChecked, set2FAStatus] = useState();
    const handle2FAChange = () => {
        set2FAStatus(!isChecked);
        const endpoint = isChecked ? "http://localhost:3000/auth/2fa/disable" : "http://localhost:3000/auth/2fa/enable";
        const status = isChecked ? 1 : 0;
        axios.put(endpoint, status, { withCredentials: true }) 
        .then (() => {})
        .catch(() => {});
    }
    interface Token {
        username : string
    }
    const cookie = new Cookies();
    const token : Token = jwt_decode(cookie.get('jwt'));
	const [update , setUpdate] = useState("");
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
                            <span className="is-primary">Choose Avatar</span>
                        </div>
                            {/* <Avatars /> */}
                        <div className="uploadContainer">
                            <label className="nes-btn">
                                <input onChange={(e) => setUpdate(e.target.value)} formMethod="post" type="file" name="avatarUpload" accept=".png, .jpg, .jpeg" />
                                <span>Upload your avatar</span>
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
                            <button style={{width: 'fit-content'}} onClick={RetrieveCheckSendData} type="button" className={`nes-btn  ${update ? "is-success" : "is-disabled"}`}>Update</button>
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
                                        <img style={{width: '100px', height: '100px', borderRadius: '50%', margin: '10px'}} src={token.image}></img>
                                        <a style={{fontWeight: "bold"}}>{token.username}</a>
                                    </div>
                                </Anime>
                                <div>
                                    <button style={{margin: '10px'}} className="nes-btn">Cancel</button>
                                    <a style={{margin: '10px'}} href="/home" className="nes-btn is-primary">Confirm</a>
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
