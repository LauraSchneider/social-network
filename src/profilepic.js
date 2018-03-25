import React from 'react';

export default function ProfilePic(props) {

    return (

<div id="profilepic-container">
     <img id="profilepicupload"
         onClick={props.toggleUploader}
         src={ props.url }
         alt={`${props.first} ${props.last}`}
     />
 </div>
 )
}
