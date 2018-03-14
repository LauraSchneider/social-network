import React from 'react';
import Registration from './registration';
import Logo from './logo';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';


export default function Welcome(props) {
    console.log("inside welcome component", props);
    return (
        <div id="welcome">
            WELCOME. 
            <Logo />

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    )

}
