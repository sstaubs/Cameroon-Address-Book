import {GET_REF } from './actionTypes'

export const getReference = (refpoint) => {
    return{
        type: GET_REF,
        refpoint: refpoint,
    };
};