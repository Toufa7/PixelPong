{
    userData.status === "ONLINE" ? (
      <>
        <div/>
        {
            userData.inGame ? (<span>InGame</span>) : (<span>Not In Game</span>)
        }
      </>
    )
    :
    userData.status !== "ONLINE" ? (<><div></>) : (<></>)
}