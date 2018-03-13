import React from 'react';
import Registration from './registration';
import Logo from './logo';

export default function Welcome(props) {
    console.log("inside welcome component", props);
    return (
        <div>
            <Logo />
            I am the welcome page.
            <Registration />


        </div>
    )

}
