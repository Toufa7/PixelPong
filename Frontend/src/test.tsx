const [data, setData] = useState(false);
const [twoFAStatus, setTwoFAStatus] = useState(false);
useEffect(() => {
    console.log("2Settings")
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    console.log("JWT -> " ,jwt)
    const token = jwt_decode(jwt);
    const fetchData = async () => {
        try {
            const endpoint = 'http://localhost:3000/auth/2fa/get2FAstatus';
            const endpoint1 = `http://localhost:3000/users/${token.id}`;

            const [response, response1] = await Promise.all([
                axios.get(endpoint1, { withCredentials: true }),
                axios.get(endpoint, { withCredentials: true })
            ]);
            setData(response1.data);
            setTwoFAStatus(response.data);
        }
        catch (error) {
            console.log("Error" , error);
        }};
        fetchData();
}, []);