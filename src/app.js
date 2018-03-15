import React from 'react';
import axios from 'axios';
import Logo from './logo';
import Profilepic from './profilepic';
import Profilepicupload from './profilepicupload';

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: '',
            showUploader: false

        };
        this.toggleuploader = this.toggleuploader.bind(this);
    }
toggleUploader() {
    this.setState({ showUploader: !this.state.showUploader })
}
    componentDidMount() {
        axios.get('/user').then(resp => {
            // console.log("RESP", resp);
            const { id, first, last, email, url } = resp.data.data;
            this.setState(
                {id: id, first: first, last: last, email: email, url: url }
            )}, () => {
            console.log("new state", this.state);

        });
    }
render() {
    return (
        <div>
            <h1>Welcome {this.state.first} at {this.state.email}</h1>
            <Profilepic
                first = {laura}
                last = {s}
                url = {www.url.com}
                />
        </div>

        )
    }
}

{/*toggleuploader = {this.state.toggleUploader}*/}
{/*{ this.state.showUploader && <Profilepicupload  }*/}
