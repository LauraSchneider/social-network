import React from 'react';
import {getFriends, acceptFriends, terminateFriends} from './actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';


const mapStateToProps = state => {
    return {
        pendingFriends: state.friends && state.friends.filter(friend => friend.status == 1),
        acceptedFriends: state.friends && state.friends.filter(friend => friend.status == 2)
    }
}
class Friends extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getFriends())
    }
    //right after html has loaded, the list of friends is shown on page

    render() {
        if (!this.props.pendingFriends) {
            return null
        }
        const pendingFriendsList = this.props.pendingFriends.map((pending, id) => (
        <div key={id}>
            <h1>{pending.first} {pending.last}</h1>
            <Link to={`/user/${pending.id}`}> <img className="otherprofilepic" src={pending.url || "/img/profile_pic.jpg"} alt="Profile Pic"/></Link>
            <button id="accept-button" onClick={() =>{this.props.dispatch(acceptFriends(pending.id))}}>Accept</button>
        </div>
    ))
        const acceptedFriendsList = this.props.acceptedFriends.map((accepted, id) => (
        <div key={id}>
            <h1>{accepted.first} {accepted.last}</h1>
            <Link to={`/user/${accepted.id}`}> <img className="otherprofilepic" src={accepted.url || "/img/profile_pic.jpg"} alt="Profile Pic"/></Link>
            <button id="unfriend-button" onClick={() => {this.props.dispatch(terminateFriends(accepted.id))}}>Unfriend</button>
        </div>
    ))

        return (<div>
            <div className="pendaccept-container">
                <div id="pendinglist-container">
                    <h1 className="pending-and-accept">Pending Friends:</h1>
                    <div className="friends">{pendingFriendsList}</div>

                </div>
                <div id="acceptedlist-container">
                    <h1 className="pending-and-accept">Accepted Friends:</h1>
                    <div className="friends">{acceptedFriendsList}</div>
                </div>
            </div>
        </div>)
    }
}

export default connect(mapStateToProps)(Friends)
//this connects to Redux
