import React from 'react';
import Registration from './registration';
import Logo from './logo';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';


export default function Welcome(props) {
    return (
        <div id="welcome">

            <div className="banner-container">
            </div>

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
