import React from 'react';
import { connect } from 'react-redux';

class OnlineFriends extends React.Component {
    constructor(props) {
        super(props);
        this.renderFriends = this.renderFriends.bind(this)
    }

    renderFriends() {
        if(!this.props.onlineUsers){
            return (<div>Loading...</div>)
        }

        return this.props.onlineUsers.map(user => {
            return (
                <div key={user.id}>
                    <p id="who-online">{user.first} {user.last}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="onlinefriends-container">
                <h1 id="online" className="onlinefriends">See who is online:</h1>

                <div className="onlinefriends">{this.renderFriends()}</div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        onlineUsers: state.onlineUsers
    }
}

export default connect(mapStateToProps)(OnlineFriends)
