import axios from 'axios';

export function getFriends() {
    return axios.get('/getfriends').then(resp => {
        // console.log("RESP", resp);
        return {type: 'GET_FRIENDS', friends: resp.data.friends};
    });
}

// export function terminateFriendship(recipient_id) {
//     return axios.post(`/terminatefriendship/${recipient_id}` ).then(resp => {
//         return {
//             type: 'END_FRIENDS',
//             recipient_id: resp.data.recipien_id
//         };
//     });
// }
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
