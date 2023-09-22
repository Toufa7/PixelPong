const Avatars = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    console.log(selectedIndex)
    const avatarSelector = (index: number) => {
      setSelectedIndex(index);
    };

  return (
    <>
      <div className="avatars">
        <img
          onClick={() => avatarSelector(0)}
          src={appel}
          className={selectedIndex === 0 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(1)}
          src={appel}
          className={selectedIndex === 1 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(2)}
          src={appel}
          className={selectedIndex === 2 ? 'selected' : ''}
        />
      </div>
      <div className="avatars">
        <img
          onClick={() => avatarSelector(3)}
          src={appel}
          className={selectedIndex === 3 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(4)}
          src={appel}
          className={selectedIndex === 4 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(5)}
          src={appel}
          className={selectedIndex === 5 ? 'selected' : ''}
        />
      </div>
    </>
  );
};




*****



const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const selectedFile = e.target.querySelector('[name="avatarUpload"]').files[0];
  const nicknameInput = e.target.querySelector('[name="nickname"]').value;

  if (selectedFile && nicknameInput) {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Upload the file using axios
      await axios.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Avatar uploaded successfully!');
      // Continue with any other necessary actions

    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  } else {
    console.log('No Credentials :(');
  }
};