import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
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
                },() => {console.log(this.state);
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
        <div>
            {this.state.error && <div>{this.state.errorMessage}</div>}
            <form>
            <input onChange={this.handleChange} name="email" type="text" placeholder="Email"/>
            <input onChange={this.handleChange} name="password" type="password" placeholder="Password"/>
            <button onClick={this.handleSubmit}>Submit</button>
        </form>


        <Link to="/">Click here to Register!</Link>
    </div>)
    }
}
