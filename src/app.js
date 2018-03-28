//CLIENT SIDE
import React from 'react';
import axios from './axios';
import Logo from './logo';
import Profile from './profile';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import OtherProfile from './otherprofile';
import Friends from './friends';
import OnlineFriends from './onlinefriends';
import Chat from './chat';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: 'https://res.cloudinary.com/closebrace/image/upload/w_400/v1491315007/usericon_id76rb.png',
            bio: '',
            showUploader: false,
            showBio: false,
        };
        this.setImage = this.setImage.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.toggleBio = this.toggleBio.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    toggleUploader() {
        this.setState({
            showUploader: !this.state.showUploader
        })
    }
    toggleBio() {
        console.log("running toggleBIO");
        this.setState({
            showBio: !this.state.showBio
        })
    }
    componentDidMount() {
        // console.log("COMPONENT DID MOUNT");
        axios.get('/user').then(resp => {
            // console.log("RESPONSES PLS", resp);
            const {id, first, last, email, url, bio} = resp.data;
            this.setState({
                id,
                first,
                last,
                email,
                url: url || this.state.url,
                bio

            })
        }, () => {
            console.log("new state", this.state);
        });

    }
    setImage(url) {
        this.setState({url})
    }

    setBio(bio) {
        console.log("running setBIO");
        this.setState({bio})
    }

    render() {
        const {
            first,
            last,
            url,
            email,
            bio,
            showUploader,
            showBio
        } = this.state
        return (
            <div>
                <div id = "app-logo-container" >
                    <Logo/>
                </div>


                <BrowserRouter>
                    <div>
                        <nav>
                             <ul>
                                <li><Link to="/">Profile</Link></li>
                                <li><Link to="/friends">Friends</Link></li>
                                <li><Link to="/onlinefriends">Online Friends</Link></li>                                    <li><Link to="/chat">Chat</Link></li>
                                <li><a href="/logout">Log Out</a></li>
                        

                             </ul>
                        </nav>


                        <Route path="/" exact render={() => (
                                <Profile
                                    first={first}
                                    last={last}
                                    url={url}
                                    bio={bio}
                                    showUploader={showUploader}
                                    setBio={this.setBio}
                                    toggleBio={this.toggleBio}
                                    toggleUploader={this.toggleUploader}
                                    showBio={showBio}
                                    setImage={this.setImage}
                                />
                            )}
                        />
                        <Route exact path="/user/:id" component={OtherProfile}/>
                        <Route exact path="/friends" component={Friends}/>
                        <Route exact path="/onlinefriends" component={OnlineFriends}/>
                        <Route exact path="/chat" component={Chat}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
