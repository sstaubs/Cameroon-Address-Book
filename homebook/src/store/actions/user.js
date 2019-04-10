import {GET_USER } from './actionTypes'

export const getUser = (uid) => {
    return{
        type: GET_USER,
        uid: uid,
    };
};