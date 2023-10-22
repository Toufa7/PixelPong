import { useEffect, useState, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './chatSearch.scss';
import DmChatUser from './dmChatUser'
import search from '../assets/search.svg'

// interface friend {
//     userName: string;
//     pic: string;
//     id: string;
// }

const chatSearch = (props: any) => {

    const [Found, FoundState] = useState(false);
    const [notFound, notFoundState] = useState(false);
    const [visible, setVisible] = useState(true);
    const [friendsIds, setFriendsIds] = useState<any[]>();
    const [friendFound, setFriendFound] = useState('');

    const firstRef = useRef(null);

    //Identifying local users
    const cookieJwt = document.cookie;
    const jwtArr:string[] =  cookieJwt.split("=");
    let localUser: any = jwtDecode(jwtArr[1]);
    
    console.log("Local user is : ", localUser)
    //http://localhost:3000/users/profil

    useEffect(() => {
        fetchCurrentUserInfo(localUser.id);
        async function fetchCurrentUserInfo(id: any) {
            try
            {
                const response = await axios.get(`http://localhost:3000/users/Friends/`, { withCredentials: true });
                setFriendsIds(response.data)
            }
            catch (error) {
                console.log("ERROR : fetchCurrentUserInfo[Search Component]() : ", error);
            }
        }
    }, [])

    const removeElement = () => {
        setVisible((prev) => !prev);
        FoundState(false);
        notFoundState(false);
    };
    
    const onSubmitHandler = (e:any) => {
        
        e.preventDefault();
        const searchValue = document.querySelector('.searchBar')?.value;

        //https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
        if (friendsIds?.find(obj => obj.username === searchValue) != undefined) 
        {
            FoundState(true);
            notFoundState(false);
            setFriendFound(friendsIds?.find(obj => obj.username === searchValue));
        }
        else
        {
            notFoundState(true);
            FoundState(false);
        }
        firstRef.current.value = '';
    }

    //Sending found user to parent conponenet (using this callback function)
    const updateSharedString = (newString: string) =>
    {
        props.userFound(newString);
    };

    return (
        <div className="chatSearchDiv">
            <span>CHAT</span>
            <div className="searchForm">
                <form className="fromClass" onSubmit={onSubmitHandler}>
                    <input type='text' ref={firstRef} placeholder='Search' className='searchBar'/>
                </form>
            </div>
            <div className="SearchUserChat">
                {Found &&   <div onClick={removeElement}>
                                <DmChatUser userName={friendFound.username} pic={friendFound.profileImage} id={friendFound.id} userId={updateSharedString} />
                            </div>}
                {notFound && <div onClick={removeElement}>
                                <DmChatUser userName={"Not Found"} pic={search}/>
                            </div>}
            </div>
        </div>
    )
}
export default chatSearch