import React, { useEffect, useState } from 'react';
import './twoFA.scss';
import axios from 'axios';
import aaa from './../addons/assets/profilLogo.svg'

function TwoFa() {
    const [qrCode, updateQr] = useState(aaa);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/2fa/enable", { withCredentials: true })
        .then((response) => {
            console.log("Reponse GET -> ", response);
            updateQr(response.data);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
    }, []);

    const iClick = () =>  {
        let a : string = '';
        const arr = document.querySelectorAll('.nes-input');
        for (let index = 0; index < arr.length; index++) {
            a += arr[index].value;
        }
        
        const data = {
            otp : a
        }
        console.log("Code => ", a);
        
        axios.post("http://localhost:3000/auth/2fa/validate", data, { withCredentials: true })
        .then((response) => {
            console.log("Reponse ", response);
        })
        .catch((error) => {
            console.log("Error ", error)
        })
    }
    
    return (
        <div className="container">
            <div className="twoFaBox">
                <div className="header">2FA</div>
                <div className="content">
                    <p>Enter the authentication code</p>
                    <img className="qrcode" src={qrCode} alt="QR Code"/>
                    <div className="nes-field">
                        <p>Please enter the 6 digits code from your authentication
                            <a href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US' target='_blank'> app</a>
                        </p>
                        <input type="text" min={1} max={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" min={1} max={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" min={1} max={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" min={1} max={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" min={1} max={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" min={1} max={1} id="name_field" className="nes-input" placeholder='*'/>
                    </div>
                    <div className="verify">
                        <button onClick={iClick} className="nes-btn">Verify</button>
                    </div>
            </div>
        </div>
        </div>

    );
}

export default TwoFa;