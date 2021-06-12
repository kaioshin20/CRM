import {GET_ALL_BOOKING,ADD_BOOKING,EDIT_BOOKING,GET_BOOKING_BY_ID
} from '../actions/types'

const initialState = {
    booking:null,
    bookById:null
}
    

export default function(state = initialState,action){
    switch(action.type){


            case GET_ALL_BOOKING:
                return {
                    ...state,
                    booking:action.payload
                }

                case GET_BOOKING_BY_ID:
                return {
                    ...state,
                    bookById:action.payload
                }

        default :
        return state
    }
}