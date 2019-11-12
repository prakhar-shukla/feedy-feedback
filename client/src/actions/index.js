import axios from 'axios'
import * as types from './types'

export const fetchUser=()=>{
    return async function(dispatch){
        var response= await axios.get('/api/current_user');
        dispatch({type:types.FETCH_USER,payload:response.data});
    }
    
}

export const sendSurvey=(values,history)=>{
    return async function(dispatch){
        var response = await axios.post('/api/surveys',values);
        history.push('/dashboard')
        dispatch({type:types.FETCH_USER,payload:response.data})
    }
}