import {SET_USER_PHOTO,DELETE_USER_PHOTO} from '../actions/types';


const initialState = {
    photo:localStorage.getItem('image')
};

export default function(state=initialState,action){
    switch(action.type){
        case SET_USER_PHOTO:
            return{...state,photo:action.payload}
        case DELETE_USER_PHOTO:
            return {...state,photo:null}
   
        default:
        return state;

    }
}