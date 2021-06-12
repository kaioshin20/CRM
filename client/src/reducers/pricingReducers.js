import {GET_FILES, UPLOAD_FILES, GET_DATA, SET_DATA,GET_RATES, SET_RATES, RATES_LOADING} from '../actions/types'

const initialState ={
    FilesUploaded: [],
    rateToUpload: [],
    rates: [],


    ratesLoading: false
    
}



export default function(state =  initialState, action){
    // console.log("Reached Reducer with: ", action)
    switch(action.type){

        case GET_FILES : 
            return state.FilesUploaded


        case UPLOAD_FILES : 
            var x = {
                ...state,
                FilesUploaded :action.payload
            }
            return x

        case GET_DATA : 
            return state.rateToUpload
        case SET_DATA : 
            var x = {
                ...state,
                rateToUpload :action.payload
            }
            return x
        case GET_RATES : 
            return state.rates
        case SET_RATES : 
            var x = {
                ...state,
                rates :action.payload
            }
            return x
        case RATES_LOADING :
            return {
                ...state,
                ratesLoading : true
            }

        
        default:
            return state;   
    }
}