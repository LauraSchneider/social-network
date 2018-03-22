
export default function(state = {}, action) {
    if (action.type === 'GET_FRIENDS') {
        state = Object.assign({}, state, {
            friends: action.friends
        });

    }
console.log("STATE", state);
    return state;//to check if you successfully updated the state, log 'state' right before return
}
