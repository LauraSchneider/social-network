import axios from 'axios';

export function getFriends() {
    return axios.get('/getfriends').then(resp => {
        // console.log("RESP", resp);
        return {type: 'GET_FRIENDS', friends: resp.data.friends};
    });
}

// export function makeFriends() {
//     return axios.get('/friends').then(function({ data }) {
//         return {
//             type: '',
//             id:
//
//         };
//    });
// }
// export function endFriendship() {
//     return axios.get('/friends').then(function({ data }) {
//         return {
//             type: 'id',
//             id:
//
//         };
//    });
// }
