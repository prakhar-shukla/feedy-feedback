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
        dispatch({type:types.FETCH_USER,payload:response.data});
        fetchSurveys();
    }
}

export const fetchSurveys=()=>{
    return async function(dispatch){
        var response= await axios.get('/api/surveys');
        dispatch({type:types.FETCH_SURVEYS,payload:response.data})
    }
}