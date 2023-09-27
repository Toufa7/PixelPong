import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [isChecked, set2FAStatus] = useState(false);
  const enablingEndpoint = 'http://localhost:3000/auth/2fa/enable';
  const disablingEndpoint = 'http://localhost:3000/auth/2fa/disable';

  if (isChecked) {
    axios
      .put(enablingEndpoint, { a: 0 }, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  } else {
    axios
      .put(disablingEndpoint, { a: 1 }, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="SettingsBox">
      <div className="SettingsRectangle">
        <div style={{ textAlign: 'center' }} className="SettingsBoxHeader">
          Settings
        </div>
        <div className="SettingsBoxContent">
          <div
            className="twoFa"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <label style={{ textAlign: 'left' }}>2FA</label>
            <label style={{ textAlign: 'right' }}>
              <input type="checkbox"
                className="nes-checkbox"
                onChange={() => set2FAStatus(!isChecked)}
              />
              <span>{isChecked ? 'Enabled' : 'Disabled'}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};