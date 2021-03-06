import React from "react";
import '../docs/styles/root.css';
import '../docs/styles/profile.css';
import '../docs/styles/element.css';
import '../docs/styles/collection.css';
import cover from '../docs/assets/cover.png';
import picture from '../docs/assets/profile_picture.png';
import Element from './Element';
import {get} from './http';

export default function Profile() {

    const [userinfo, setUserinfo] = React.useState({id: '1', name: 'Name', username: 'email', img: picture});

    React.useEffect(() => {
        get('users/1').then(res => {
            setUserinfo({name: res[0].name, username: res[0].email, id: res[0].id, img: picture})
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const collectibleCollection = [
        {img: "robot (1).gif", id: '1', name: 'Collectible 1', description: 'This is a collectible description'},
        {img: "robot (2).gif", id: '2', name: 'Collectible 2', description: 'This is a collectible description'},
        {img: "robot (3).gif", id: '3', name: 'Collectible 3', description: 'This is a collectible description'},
        {img: "robot (4).gif", id: '4', name: 'Collectible 4', description: 'This is a collectible description'},
        {img: "robot (5).gif", id: '5', name: 'Collectible 5', description: 'This is a collectible description'},
        {img: "robot (6).gif", id: '6', name: 'Collectible 6', description: 'This is a collectible description'},
        {img: "robot (7).gif", id: '7', name: 'Collectible 7', description: 'This is a collectible description'}
    ]

    return (
        <main>
            <div className="profile-header">
                <img alt="cover" className="cover" src={cover}/>
                <img alt="profile" className="profile-p" src={userinfo.img}/>
                <p className="username"> {userinfo.username} </p>
                <p className="sub-username"> some info of collection </p>
            </div>

            <div className="collection">
                {collectibleCollection.map(e =>
                    <Element id={e.id} name={e.name} description={e.description} asset={e.img}/>
                )}

            </div>
        </main>
    );
}