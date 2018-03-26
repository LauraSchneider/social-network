
export default function(state = {}, action) {
    console.log("ACTION REDUCER", action);
    if (action.type === 'GET_FRIENDS') {
        state = Object.assign({}, state, {
            friends: action.friends
        });

    }
    if (action.type === 'ACCEPT_FRIENDS') {
        state = Object.assign({}, state, {
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    // console.log("checking reducers State.friends", state.friends);

                    return Object.assign({}, friend,{status: 2})
                } else {
                    return Object.assign({}, friend);
                }

            })

        });
    }
    if (action.type === 'TERMINATE_FRIENDS') {
        console.log("ACTION!!!!", action);
        state = Object.assign({}, state, {

            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    return Object.assign({}, friend, {status: 4})
                } else {
                    return Object.assign({}, friend);
                }
            })
        })
    }


    return state;//to check if you successfully updated the state, log 'state' right before return
}
