import {GET_ALL_FROM_STORAGE,
    ADD_IN_STORAGE
} from '../actions/types'

const initialState = {
    storage:null
}
    

export default function(state = initialState,action){
    switch(action.type){

    
            case GET_ALL_FROM_STORAGE:
                return {
                    ...state,
                    storage:action.payload
                }

                        case ADD_IN_STORAGE:
                                     return {
                                            ...state,
                                            storage:[action.payload, ...state.storage]
                                        }

        default :
        return state
    }
}