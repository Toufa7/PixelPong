import "./LoginSettings.scss"
import img3 from './assets/FarmerBoy.png';
import img2 from './assets/Detective.png';
import img1 from './assets/Glasses.png';
import img4 from './assets/Lady.png';
import img5 from './assets/old_man.png';
import img6 from './assets/Girl2.png';
import axios from "axios";


const retrieveSendData = () => {

    const uploadAvatar = () => {
        const avatar =  document.querySelector('[name="avatarUpload"]').files[0];
        const nicknameInput = document.querySelector('[name="nickname"]').value;
        console.log("MY Nic -> ", nicknameInput.value)
        const data = new FormData();
        data.append('file', avatar)
        console.log(" => ",avatar)
        console.log(data);
        axios.post('http://localhost:3000/auth/signup-success', {username : nicknameInput} , { withCredentials: true })
        .then((response) => {
            console.log("Respo => ", response)
        })
        axios.post('http://localhost:3000/auth/uploads', data, { withCredentials: true })
        .then((response) => {
            console.log("Respo => ", response)
        })

    }
    
    uploadAvatar();





    // const avatarInput   = document.querySelector('[name="avatarUpload"]');
    // const nicknameInput = document.querySelector('[name="nickname"]');
    // if (nicknameInput && avatarInput != null) 
    // {
    //     console.log(nicknameInput.value);
    //     console.log( avatarInput.files[0].name);

    //     // axios.all([
    //     //     axios.post('http://localhost:3000/auth/signup-success', {username: nicknameInput.value}, { withCredentials: true }),
    //     //     axios.post('http://localhost:3000/auth/uploads', {file: avatarInput.files[0].name}, { withCredentials: true })
    //     // ]).then(axios.spread((usernameResponse, avatarResponse) => {
    //     //     console.log(usernameResponse, avatarResponse);
    //     // }))
    // }
    // else
    //     console.log("No Credentials :(")
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
        <div  className="avatars">
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




// class testinginteface implements test{
    
    //     constructor(){}
    //     public print() : string{
        //         console.log("sss");
        
        //         return "h";
        //     }
        // }
        
export default function LoginSettings() {

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
                            <a onClick={retrieveSendData} className="nes-btn">Start</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}