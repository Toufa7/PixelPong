import "./LoginSettings.scss"
import img3 from './assets/FarmerBoy.png';
import img2 from './assets/Detective.png';
import img1 from './assets/Glasses.png';
import img4 from './assets/Lady.png';
import img5 from './assets/old_man.png';
import img6 from './assets/Girl2.png';
import axios from "axios";

// const getUserData = () => {
//     axios.get('http://localhost:3000/auth/42')
//     .then((response) => {
//         console.log(response.data);
//     })
// }

// getUserData();

const retrieveSendData = () => {
    // Needs prevent default ?? 
    const avatar        = document.querySelector('[name="avatarUpload"]').files[0];
    const nicknameInput = document.querySelector('[name="nickname"]').value;
    const messages = [];

    if (nicknameInput.value === '' || nicknameInput.value == null) 
        messages.push("Null Nickname");
    if (nicknameInput.length > 10 || nicknameInput.length < 5)
        messages.push("Short/Too Long Nickname");
    if (nicknameInput)
    alert("Invalid Nickname");

    if (avatar && nicknameInput)
    {
        const data = new FormData();
        data.append('file', avatar)
        console.log("Nick ->", nicknameInput.value)
        console.log(" => ",avatar)
        console.log(data);
        axios.all([
            axios.post('http://localhost:3000/auth/signup-success', {username : nicknameInput}, { withCredentials: true }),
            axios.post('http://localhost:3000/auth/uploads', data, { withCredentials: true })
        ]).then(axios.spread((responseNickname, responseAvatar) => {
            console.log(responseNickname, responseAvatar)
        })).catch((error) => {
            console.log(error);
        })
    }
    else
        console.log("No Credentials :(")
}

const Avatars = () => {
    const handleClick = (idx : number) => {
        const avatars = [
            {img1}.img1,
            {img2}.img2,
            {img3}.img3,
            {img4}.img4,
            {img5}.img5,
            {img6}.img6
        ];
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

export default function LoginSettings() {
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
                            <input formMethod="post" type="file" name="avatarUpload" accept=".png, .jpg, .jpeg" />
                        </div>
                        <div className="startContainer">
                            <a onClick={retrieveSendData}  className="nes-btn">Start</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}