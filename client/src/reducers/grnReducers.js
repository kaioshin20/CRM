import {GET_ALL_GRN,GET_GRN_BY_ID
    
} from '../actions/types'

const initialState = {
    AllGrn:null,
    GrnById:null
}
    

export default function(state = initialState,action){
    switch(action.type){

    
            case GET_ALL_GRN:
                return {
                    ...state,
                    AllGrn:action.payload
                }

                case GET_GRN_BY_ID:
                    return {
                        ...state,
                        GrnById:action.payload
                    }
                
                        

        default :
        return state
    }
}