type UserInfo = {
    username: string;
    image: string;
  };
  
  const extractInfo = (): UserInfo | null => {
    const cookies = new Cookies();
    const token = cookies.get('jwt');
    if (token) {
      const decodedToken = jwt_decode(token) as { username?: string; image?: string };
      const { username, image } = decodedToken;
      if (username && image) {
        return {
          username,
          image
        };
      }
    }
    return null;
  };
  