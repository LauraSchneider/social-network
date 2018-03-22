import React from 'react';
import {getFriends} from './actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {}
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
        console.log("rendering friends!");
        return(
            <h1>Friends PAGE</h1>
        )
    }
}

export default connect(mapStateToProps)(Friends)
//this connects to Redux
