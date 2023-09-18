import "./UserSettings.css"
import appel from './assets/appel.jpg';

export default function Something() {
    return (
        <div className="container">
            <div className="settingsBox">
                <div className="header">Settings</div>
                <div className="footer">
                    <div>
                        <div className="nes-field">
                            <input type="text" id="name_field" className="nes-input" placeholder='Choose Nickname'/>
                        </div>
                        <div className="choosingAvatarContainer">
                            <a href="#" className="nes-badge">
                                <span className="is-primary">Choose Avatar</span>
                            </a>
                        </div>
                        <div className="avatars">
                            <img src={appel}/>
                            <img src={appel}/>
                            <img src={appel}/>
                        </div>
                        <div className="avatars">
                            <img src={appel}/>
                            <img src={appel}/>
                            <img src={appel}/>
                        </div>
                        <div className="uploadContainer">
                            <input type="file" id="avatarUpload" accept=".png, .jpg, .jpeg" />
                        </div>
                        <div className="startContainer">
                            <a className="nes-btn" href="#">Start</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}