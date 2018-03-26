import React from 'react';
import {getFriends, acceptFriends, terminateFriends} from './actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';


const mapStateToProps = state => {
    console.log("MAP STATE", state);

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
        // this.props.dispatch(terminateFriendship())

    }
    //right after html has loaded, the list of friends is shown on page

    render() {
        if (!this.props.pendingFriends) {
            return null
        }
        const pendingFriendsList = this.props.pendingFriends.map((pending, id) => (
        <div key={id}>
            <h1>{pending.first} {pending.last}</h1>
            <Link to={`/user/${pending.id}`}> <img src={pending.url} alt="Profile Pic"/></Link>
            <button onClick={() =>{this.props.dispatch(acceptFriends(pending.id))}}>Accept</button>
        </div>
    ))
        const acceptedFriendsList = this.props.acceptedFriends.map((accepted, id) => (
        <div key={id}>
            <h1>{accepted.first}{accepted.last}</h1>
            <Link to={`/user/${accepted.id}`}> <img src={accepted.url} alt="Profile Pic"/></Link>
            <button onClick={() => {this.props.dispatch(terminateFriends(accepted.id))}}>Unfriend</button>
        </div>
    ))

        return (<div>
            <div>
                <h1>Pending Friends:</h1> {pendingFriendsList}
                <h1>Accepted Friends:</h1> {acceptedFriendsList}
            </div>
        </div>)
    }
}

export default connect(mapStateToProps)(Friends)
//this connects to Redux
