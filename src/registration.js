import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export default class Registration extends React.Component {
    constructor() {
        super()

        this.state = {
            first: '',
            last: '',
            email: '',
            password: ''

        }
        this.handleChange = this.handleChange.bind(this) //similar to vue where 'this' loses its meaning (the error shows: cannot read state of property of undefined)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


     handleSubmit(e){
         e.preventDefault();
         console.log("my first LOG", this.state);
         //connecting to registration with this.state to server
        axios.post('/registration', this.state).then((resp) => {
            console.log("waiting for server RESP", resp);
            if(resp.data.success) {
                location.replace('/');
            } else {
                this.setState({
                    error: true,
                    errorMessage: resp.data.errorMessage
                },() => {console.log(this.state)})
            }
        })
     }

    handleChange(e) { //takes user input and puts it into state
        this.setState({ //state holds info about the component
            [ e.target.name ]: e.target.value //targets name of inputs and value is what the user types
        }, () => console.log("new state", this.state))
    }

    render() {
        const { first, last, email, password } = this.state
        return(

            <div>
            <div className="welcome-container">
            </div>
        <div className="holder">
<p className="welcome-message">Welcome! Come join us on awesome outdoor activities.</p>
<p className="welcome-message"> Let's meet up and have fun!</p>
            <p className="welcome-message"> Sign up below.</p>
            <div className="link-container">
                <p id="registered">Already Registered? Click <Link id="login-link" to="/login">here</Link> to Login!</p>
            </div>
            <div className="welcome-form-container">
                {this.state.error && <div className="error">{this.state.errorMessage}</div>}
                <form>
                    <input onChange={ this.handleChange } name="first" type="text" placeholder="First Name"/>
                    <input onChange={ this.handleChange } name="last" type="text" placeholder="Last Name"/>
                    <input onChange={ this.handleChange } name="email" type="text" placeholder="Email"/>
                    <input onChange={ this.handleChange } name="password" type="password" placeholder="Password"/>
                    <button id="welcome-button" onClick={ this.handleSubmit }>Submit</button>
                </form>
            </div>
    </div>
</div>
)
}


    }
