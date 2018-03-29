import React from 'react';
import ProfilePic from './profilepic'
import ProfilePicUpload from './profilepicupload'
import BioUpload from './bioUpload';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {first, last, url, bio, toggleUploader, toggleBio, showUploader, showBio, setBio, setImage } = this.props
        return (
            <div className="profile-back">
                <div id="pic-bio-container">
                    <ProfilePic
                        first={first}
                        last={last}
                        url={url}
                        toggleUploader={toggleUploader}
                        toggleBio={toggleBio}
                    />
                    { showUploader && <ProfilePicUpload setImage={ setImage }/> }

                

                    { showBio && <BioUpload setBio={ setBio }/> }

                    <div id="bio-result-container">
                        <p id="app-user-greeting">Profile</p>
                        <p>{bio}</p>
                    </div>
                </div>
            </div>
        )
    }
}
