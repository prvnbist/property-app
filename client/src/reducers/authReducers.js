import { LOGIN } from '../actions/types';

const initialState = {
    currentUser: {
        id: '',
        token: '',
    },
    errors: {},
};

// Will be implementing Redux-Saga for fetch calls later
const authReducers = (state = initialState, action) => {
    // data.token.split(' ')[1]
    switch (action.type) {
        default:
            return state;
    }
};

export default authReducers;

// case LOGIN: {
//     fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email: action.payload.email,
//             password: action.payload.password,
//         }),
//     })
//         .then(res => res.json())
//         .then(
//             data =>
//                 console.log(data.token.split(' ')[1]) || {
//                     ...state,
//                     currentUser: {
//                         id: '',
//                         token: data.token.split(' ')[1],
//                     },
//                 },
//         )
//         .catch(error =>
//             console.log('Request failure: ', error),
//         );
// }

// const loginCall = async url => {
//     const postData = await fetch(url, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email: action.payload.email,
//             password: action.payload.password,
//         }),
//     });
//     const data = await postData.json();
//     return data.token.split(' ')[1];
// };
// const token = await loginCall('/api/users/login');

// return {
//     ...state,
//     currentUser: {
//         id: '',
//         token: token,
//     },
// };
