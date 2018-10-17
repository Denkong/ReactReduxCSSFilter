import {SET_FILTER} from './types';

export const setFilter=(value,name)=>dispatch =>{
    dispatch({
        type:SET_FILTER,
        payload:value,
        name:name
    })
   
}
