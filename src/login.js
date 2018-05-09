import React from 'react';
import axios from './axios';
import {Link} from 'react-router-dom';
import Logo from './logo';

export default class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("my first LOG", this.state);
        //connecting to registration with this state to server
        axios.post('/login', this.state).then((resp) => {
            console.log("waiting for server errorMessage", resp.data.errorMessage);
            console.log("RESPONSE", resp);
            if (resp.data.success) {
                location.replace('/login');
            } else {
                this.setState({
                    error: true,
                    errorMessage: resp.data.errorMessage
                }, () => {
                    console.log(this.state);
                })
            }
        })
    }

    handleChange(e) { //takes user input and puts it into state
        this.setState({ //state holds info about the component
            [e.target.name]: e.target.value //targets name of inputs and value is what the user types
        }, () => console.log("new state", this.state))
    }

    render() {
        const {email, password} = this.state
        return (

            <div id="login-container">

                <div id="strip1-container">
                    <img src="./img/strip1.png"/>
                </div>
                <div className="logo-and-form">
                <div className="logo-container">
                    <Logo/>
                </div>
                <div id="login-info-container">
                    <p id="back" className="welcome-message">Welcome back!</p>
                <div className="link-container">
                    <p>Not registered yet? Click <Link id="register-link" to="/">here.</Link></p>
                </div>
                <div className="login-form-container">
                    {this.state.error && <div id="login-error">{this.state.errorMessage}</div>}
                    <form>
                        <input onChange={this.handleChange} name="email" type="text" placeholder="Email"/>
                        <input onChange={this.handleChange} name="password" type="password" placeholder="Password"/>
                        <button id="login-button" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
                </div>
            </div>
                <div id="strip2-container">
                    <img src="./img/strip2.png"/>
                </div>

            </div>
        )
    }
}
