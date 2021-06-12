import {GET_ALL_PickList,GET_PickList_BY_ID
    
} from '../actions/types'

const initialState = {
    AllPickList:null,
    PickListById:null
}
    

export default function(state = initialState,action){
    switch(action.type){

    
            case GET_ALL_PickList:
                return {
                    ...state,
                    AllPickList:action.payload
                }

                case GET_PickList_BY_ID:
                    return {
                        ...state,
                        PickListById:action.payload
                    }
                
                        

        default :
        return state
    }
}