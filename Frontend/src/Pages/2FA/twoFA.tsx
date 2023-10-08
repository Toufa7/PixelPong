import { useEffect, useState } from 'react';
import './twoFA.scss';
import axios from 'axios';
import { Toaster , toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Toasts = () => {
    return (
        <Toaster
            reverseOrder={false}
            position='top-right'
            toastOptions={{
                style: {
                    borderRadius: '8px',
                    background: '#AC8FB4',
                    color: '#fff',
                },
            }}
        />
    );
}

function TwoFa() {
    const [qrCode, updateQr] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/auth/2fa/set2fa", { withCredentials: true })
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
            if (response.status != 400)
            {
                toast.success("Success");
                navigate("/home");
            }
            else
                toast.error("Invalid Code");
        })
        .catch((error) => {
            console.log("Error ", error)
            toast.error("Invalid Code");
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
                        <input type="text" maxLength={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" maxLength={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" maxLength={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" maxLength={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" maxLength={1} id="name_field" className="nes-input" placeholder='*'/>
                        <input type="text" maxLength={1} id="name_field" className="nes-input" placeholder='*'/>
                    </div>
                    <div className="verify">
                        <Toasts/>
                        <button onClick={iClick} className="nes-btn">Verify</button>
                    </div>
            </div>
        </div>
        </div>

    );
}

export default TwoFa;