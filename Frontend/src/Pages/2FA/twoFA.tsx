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
            toastOptions={{style: {borderRadius: '8px',background: '#FFF',color: '#000'},
            duration: 2000,
        }}/>
    );
}


function TwoFa() {
    const [qrCode, updateQr] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/2fa/set2fa", { withCredentials: true })
        .then((response) => {
            updateQr(response.data);
        })
        .catch((error) => {
            toast.error(error.response.data.error);
        });
    }, []);

    const iClick = () =>  {
        let a : string = '';
        const arr = document.querySelectorAll('.nes-input');
        for (let index = 0; index < arr.length; index++) {
            a += arr[index].value;
        }
        const data = {otp : a}
        axios.post("http://localhost:3000/api/auth/2fa/validate", data, { withCredentials: true })
        .then((response) => {
            console.log("Respones -> ", response.data);
            if (response.status != 400)
            {
                toast.success("Success");
                window.location.href = "/home";
                navigate("/home");
            }
            else
                toast.error("Invalid Code");
            }
        )
        .catch(() => {
            toast.error("Invalid Code");
        });
    }
    
    return (
        <div style={{height: '100vh'}}>
        <Toasts/>
        <div className="container">
            <div className="twoFaBox">
                <div style={{height: '50px'}} className="header">2FA</div>
                <div className="content">
                    <p>Ingrese el código de autenticación</p>
                    <img className="qrcode" src={qrCode} alt="QR Code"/>
                    <div className="nes-field">
                        <p>Ingrese el código de 6 dígitos de su aplicación de autenticación
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
                        <button onClick={iClick} className="nes-btn">Verificar</button>
                    </div>
            </div>
        </div>
        </div>
        </div>

    );
}

export default TwoFa;