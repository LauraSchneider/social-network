import React from 'react';
import Registration from './registration';
import Logo from './logo';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';


export default function Welcome(props) {
    return (
        <body class="welcome-body">
        <div id="welcome">

            <div className="welcome-container">
            </div>

            {/*<Logo />*/}

            <p class="welcome-message">Welcome! Come join us on awesome outdoor activities.</p>
            <p class="welcome-message"> Let's meet up and have fun!</p>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>

        </div>
    </body>
    )

}
