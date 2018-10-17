import {SET_FILTER} from '../actions/types';


const initialState = {
    blur:0,
    brightness:1,
    contrast:1,
    grayscale:"0",
    hueRotate:"0",
    invert:"0",
    opacity:"100",
    saturate:'100',
    sepia:"0"
};

export default function(state=initialState,action){
    switch(action.type){
        case SET_FILTER:
            return{...state,[action.name]:action.payload}
        
        default:
        return state;

    }
}