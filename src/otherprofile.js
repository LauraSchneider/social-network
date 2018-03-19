import React from 'react';
import axios from './axios';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: 'https://res.cloudinary.com/closebrace/image/upload/w_400/v1491315007/usericon_id76rb.png',
            bio: 'No bio yet',
        };
    }

componentDidMount() {
    // console.log("CHECKING ID", this.props.match.params.id);
    axios.get(`/get-user/${this.props.match.params.id}`).then(resp => {

        if (resp.data.success === false) {
            return this.props.history.push('/')
        } else {
            // console.log("INSIDE OF COMPONENTDIDMOUNT THEN FUNCTION", resp.data);
            const {id, first, last, email, url, bio} = resp.data;
            this.setState({
                id,
                first,
                last,
                email,
                url: url || this.state.url,
                bio: bio || this.state.bio

            // },
            // () => {
            //     console.log("Very new state", this.state);
            })

        }

    })

}

render() {
    const {id, first, last, email, url, bio} = this.state
    return (
        <div>
        <h1>Hello {first} {last} at {email}</h1>
        <h1>Bio:{bio}</h1>
        <img src={url} alt="Profile Picture"/>
        </div>
    )
    }
}
