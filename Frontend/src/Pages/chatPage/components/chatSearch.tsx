import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './chatSearch.scss';
import DmChatUser from './dmChatUser'
import search from '../assets/search.svg'
import toast from 'react-hot-toast';

interface localUserClass
{
    id: string,
    email: string,
    profileImage: string,
    status: string,
    username: string,
}

const chatSearch = (props: any) => {

    const [Found, FoundState] = useState(false);
    const [notFound, notFoundState] = useState(false);
    const [friendsIds, setFriendsIds] = useState<any[]>();
    const [friendFound, setFriendFound] = useState<localUserClass>({ id: '', email: '', profileImage: '', status: '', username: '' });

    const firstRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/Friends/`, { withCredentials: true })
            .then((res:any) =>  {
                setFriendsIds(res.data)
            })
            .catch(Error)
    }, [])

    const removeElement = () => {
        FoundState(false);
        notFoundState(false);
    };
    
    const onSubmitHandler = (e:any) => {
        
        e.preventDefault();
        const searchValue = (document.querySelector('.searchBar') as HTMLInputElement).value;

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

        if (firstRef.current != null)
        {
            firstRef.current.value = '';
        }
    }

    //Sending found user to parent conponenet <chatNavBar> (using this callback function)
    const updateSharedString = (newString: string) =>
    {
        if (newString != '')
        {
            props.userFound(newString);
        }
    };

    return  (
                <div className="chatSearchDiv">
                    <span>CHAT</span>
                    <div className="searchForm">
                        <form className="fromClass" onSubmit={onSubmitHandler}>
                            <input type='text' ref={firstRef} placeholder='Search' className='searchBar'/>
                        </form>
                    </div>
                    <div className="SearchUserChat">
                        {Found && <div onClick={removeElement}>
                            <DmChatUser userName={friendFound.username} pic={`http://localhost:3000/auth/avatar/${friendFound.id}`} id={friendFound.id} userId={updateSharedString} />
                            </div>}
                        {notFound && <div onClick={removeElement}>
                            <DmChatUser userName={"Not Found"} pic={search} id='' userId={updateSharedString}/>
                        </div>}
                    </div>
                </div>
            )
}
export default chatSearch