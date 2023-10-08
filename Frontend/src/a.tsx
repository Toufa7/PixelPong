const RedirectToSettings = () => {
    const cookies = new Cookies();
    const gifError = "https://cdna.artstation.com/p/assets/images/images/042/426/882/original/lane-galvao-pc001.gif";
    const jwt = cookies.get('jwt');
    const isTwoFactorAuthenticated = true; // Replace with your actual flag/state variable
    const isTwoFactorCodeValid = true; // Replace with your actual flag/state variable
  
    if (jwt != null && isTwoFactorAuthenticated && isTwoFactorCodeValid) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="settings" Component={LoginSettingsComponents} />
            <Route path="home" Component={HomeComponents} />
            <Route path="profil" Component={ProfilComponents} />
            <Route path="game" Component={GameComponents} />
            <Route path="profil/*" Component={OtherUser} />
            <Route path="chat" Component={ChatPage} />
            <Route path="/groups" Component={ChatGroupsComponents} />
            <Route path="*" element={<img src={gifError}></img>} />
          </Routes>
        </BrowserRouter>
      );
    } else if (jwt == null) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="welcome" />} />
            <Route path="welcome" element={<Navigate to="welcome" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (!isTwoFactorAuthenticated) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="activate2fa" />} />
            <Route path="activate2fa" element={<Activate2FA />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (!isTwoFactorCodeValid) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="enter2facode" />} />
            <Route path="enter2facode" element={<Enter2FACode />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      );
    }
  };