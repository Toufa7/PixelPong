import axios from 'axios';

interface UserSettingsProps {
  name: string;
  avatar: string;
}

const userSettingsData = (props: UserSettingsProps) => {
  const data = {
    username: props.name,
    avatar: props.avatar
  };
  const endpoint = 'http://localhost:3000';
  axios.post(endpoint, data)
    .then(response => {
      // Handle the response if needed
    })
    .catch(error => {
      // Handle the error if needed
    });
}

export default function LoginSettings() {
  const handleStartClick = () => {
    const usernameInput = document.querySelector<HTMLInputElement>('input[name="username"]');
    const avatarInput = document.querySelector<HTMLInputElement>('input[name="avatarUpload"]');

    if (usernameInput && avatarInput) {
      const name = usernameInput.value;
      const avatar = avatarInput.value;

      userSettingsData({ name, avatar });
    }
  };

  return (
    <div className="container">
      <div className="settingsBox">
        <div className="header">Settings</div>
        <div className="content">
          <div>
            <div className="nes-field">
              <input type="text" name="username" className="nes-input" placeholder='Choose Nickname' />
            </div>
            <div className="choosingAvatarContainer">
              <span className="is-primary">Choose Avatar</span>
              {/* Render Avatars component */}
            </div>
            <div className="uploadContainer">
              <input type="file" name="avatarUpload" accept=".png, .jpg, .jpeg" className="uploadContainerImg" />
            </div>
            <div className="startContainer">
              <a onClick={handleStartClick} className="nes-btn">Start</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}