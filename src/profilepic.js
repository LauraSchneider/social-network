import React from 'react';

export default function ProfilePic(props) {
    return (
        <div id="profilepic-container">
             <img id="profilepicupload"

                 src={ props.url }
                 alt={`${props.first} ${props.last}`}
             />
         <p id="upload-picture" onClick={props.toggleUploader}>Upload Picture</p>
            <p id="editbio" onClick={props.toggleBio}>Edit Bio</p>
        </div>
    )
}
