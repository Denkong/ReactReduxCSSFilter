import {SET_USER_PHOTO,DELETE_USER_PHOTO} from './types';



export const setPhoto=(name)=>dispatch =>{
    console.log('Сохранения фото');
    localStorage.setItem('image',name)  
    dispatch({
        type:SET_USER_PHOTO,
        payload:name
    })

}
export const deletePhoto=()=>dispatch =>{
    console.log('Удаление фото');
    localStorage.clear()
    dispatch({
        type:DELETE_USER_PHOTO,
        
    })

}