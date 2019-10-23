import axios from 'axios'
import * as types from './types'

export const fetchUser=()=>{
    return async function(dispatch){
        var response= await axios.get('/api/current_user');
        dispatch({type:types.FETCH_USER,payload:response.data});
    }
    
}