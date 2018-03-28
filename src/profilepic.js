import React from 'react';

export default function ProfilePic(props) {
    return (
        <div id="profilepic-container">
             <img id="profilepicupload"
                 onClick={props.toggleUploader}
                 src={ props.url }
                 alt={`${props.first} ${props.last}`}
             />
            <p id="editbio" onClick={props.toggleBio}>Edit Bio</p>
        </div>
    )
}
