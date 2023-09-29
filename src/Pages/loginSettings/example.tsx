import React from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import './LoginSettings.scss';
import img3 from './assets/FarmerBoy.png';
import img2 from './assets/Detective.png';
import img1 from './assets/Glasses.png';
import img4 from './assets/Lady.png';
import img5 from './assets/old_man.png';
import img6 from './assets/Girl2.png';


const retrieveCheckSendData = async () => {
  const avatar = document.querySelector('[name="avatarUpload"]').files[0];
  const nicknameInput = document.querySelector('[name="nickname"]').value;
  const usernameCheck = /^[A-Za-z0-9_]{5,15}$/;

  if (!nicknameInput) {
    toast.error('Provide a nickname');
    return;
  }

  if (!avatar) {
    toast.error('Upload your avatar');
    return;
  }

  if (!usernameCheck.test(nicknameInput)) {
    toast.error('Invalid nickname');
    return;
  }

  const data = new FormData();
  data.append('file', avatar);

  toast.promise(
    axios.all([
      axios.post('http://localhost:3000/auth/signup-success', { username: nicknameInput }, { withCredentials: true }),
      axios.post('http://localhost:3000/auth/uploads', data, { withCredentials: true }),
    ]),
    {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    }
  )
    .then(axios.spread((responseNickname, responseAvatar) => {
      console.log('Image Path', responseAvatar.data.image);
    }))
    .catch((error) => {
      console.log(error);
    });
};

const Avatars = () => {
  const handleClick = (idx : number) => {
    const avatars = [img1, img2, img3, img4, img5, img6];
    console.log('Avatar Selected:', avatars[idx]);
  };

  return (
    <>
      <div className="avatars">
        <img onClick={() => handleClick(0)} src={img1} alt="Avatar 1" />
        <img onClick={() => handleClick(1)} src={img2} alt="Avatar 2" />
        <img onClick={() => handleClick(2)} src={img3} alt="Avatar 3" />
      </div>
      <div className="avatars">
        <img onClick={() => handleClick(3)} src={img4} alt="Avatar 4" />
        <img onClick={() => handleClick(4)} src={img5} alt="Avatar 5" />
        <img onClick={() => handleClick(5)} src={img6} alt="Avatar 6" />
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
              <input type="text" name="nickname" className="nes-input" required placeholder="Choose Nickname" />
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
            <div className="startContainer">
              <a onClick={retrieveCheckSendData} className="nes-btn">Start</a>
            </div>
            <Toaster position="top-right" reverseOrder={true} />
          </div>
        </div>
      </div>
    </div>
  );
}