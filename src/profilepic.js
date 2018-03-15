import React from 'react';

export default function Profilepic(props) {

    return (

     <img onClick={props.toggleuploader} src={ props.url } alt="{`${props.first} ${props.last}`}"/>
 )
}
