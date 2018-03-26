import axios from './axios';

export function getFriends() {
    return axios.get('/getfriends').then(resp => {
        return {type: 'GET_FRIENDS', friends: resp.data.friends};
    });
}

export function acceptFriends(recipient_id) {
    return axios.post(`/acceptfriendrequest/${recipient_id}`).then(resp => {
        return {type: 'ACCEPT_FRIENDS', friends: resp.data.friends, id: recipient_id};
    });
}
export function terminateFriends(recipient_id) {
    return axios.post(`/terminatefriendrequest/${recipient_id}`).then(resp => {
        // console.log("RECIPIENT!", recipient_id);
        return {type: 'TERMINATE_FRIENDS', friends: resp.data.status, id: recipient_id};
    });
}

// pending.id is the user on the button we are clicking on
