import React from 'react';
import { connect } from 'react-redux';
import { emitChatMessage } from './socket';

class Chat extends React.Component {
    constructor(props) {
        super(props);

    }

//user enters message
enterChatMessage(e) {
    if (e.keyCode == 13) {
        let message = e.target.value
        e.target.value = ''
        emitChatMessage(message)
        e.preventDefault()
        console.log("CHAT Maker", message);
    }
}
    renderChats() {
        if(!this.props.chats){//.chats comes from below mapStateToProps key on left side
            return (<div>Loading...</div>)
        }
        console.log("THIS PROPS PPEEPS",this.props.chats);

        return this.props.chats.map(chats => {
            return (
                <div key={chats.id}>
                    <p>{chats.message}</p>
                </div>
            )
        })
    }


    render() {
        return (
            <div>
            <div id="chat-container">
                <div id="render">{this.renderChats()}</div>
                <form className="chat-container">
                    <textarea id="chat-form" placeholder="Insert text here. Hit Enter to send." onKeyDown={this.enterChatMessage} name="chatbox"></textarea>
                </form>
            </div>
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        chats: state.chats
    }
}

export default connect(mapStateToProps)(Chat)
