import afans from '../assets/images/fans_2.jpg'

const groupes = () => {
	const groups = [
		"Pesky InnerCity Hoppers",
		"Orange Tractors",
		"The Sprinters",
		"The Brown Razors",
		"El Grass Sensation",
		"Outer Brick Kittens"
	]


	return (
		<div className="chatGroupesDiv">
		<i>GROUPES</i>
		<div className="userChatGroupes">
			{
				groups.map((name) => {
					return (
						<div className="userChatGroup" key={name}>
						<img src={afans} alt="user-photo" />
						<div className="userChatGroupinfo">
							<span>{name}</span>
						</div>
						</div>
					);})
			}
		</div>
		</div>
	);
}

export default groupes