const GroupsAndFriends = () => {
    const friends = [
      "Helena Atkins",
      "Cristina Singleton",
      "Caleb Brady",
      "Edward Colon",
      "Saige Boyd",
      "Damarion Wilkerson",
      "Jaylah Nicholson",
      "Jamir Escobar",
      "Marissa Glass",
      "Jaylen Goodwin",
      "Akira Calderon"
    ];
  
    const groups = [
      "Atkins",
      "Wilkerson",
      "Brady",
      "Edward Colon",
      "Cristina",
      "Saige"
    ];
  
    const [label, setLabel] = useState(true);
    const cookie = new Cookies();
    const token = jwt_decode(cookie.get('jwt'));
    const myAvatar = `http://localhost:3000/auth/avatar/${token.id}`;
  
    return (
      <div className="groupsAndFriendsBox">
        <div className="gAndFBox">
          <div className="gAndFHeader">Groups & Friends</div>
          <div className="gAndFTabs">
            <button className='A' onClick={() => {
              setLabel(true);
              console.log("Groups");
            }}>Groups</button>
            <button className='B' onClick={() => {
              setLabel(false);
              console.log("Friends");
            }}>Friends</button>
          </div>
          <div className="gAndFContent">
            <div className="listParent">
              <div className="list">
                {label ? (
                  friends.map((friend, index) => (
                      <span className='name' key={index}>{friend}</span>
                    <img className="avatar" src={myAvatar}/>
                    <img className='ico' src={message}/>
                  ))
                ) : (
                  groups.map((group, index) => (
                    <span className='name' key={index}>{group}</span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };