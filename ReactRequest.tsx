
import { useState, useEffect } from "react"


export default function HttpRequest () {
    const [stats, setPosts] = useState();

    useEffect (() => {
        fetch("https://leetcode-stats-api.herokuapp.com/toufa7")
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            setPosts(data);
        })
    }, []);

    return (
    <div>
        <div>
        {
            stats !== undefined ? stats : <></>
        }
        </div>
        <div>Hello</div>
    </div>
    )
}

// https://leetcode-stats-api.herokuapp.com/toufa7