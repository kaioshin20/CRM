import {GET_CONTACTS, CREATE_CONTACTS, DELETE_CONTACT , CONTACTS_LOADING, GET_COMPANIES, COMPANIES_LOADING, GET_DEALS, UPDATE_DEAL, DEALS_LOADING, ACTIVITIES_LOADING, GET_ACTIVITIES , GET_TICKETS, TICKETS_LOADING} from '../actions/types'
import isEmpty from '../validation/isEmpty'

const initialState ={
    contacts:[],
    companies:[],
    deals:[],
    activities: [],
    tickets:[],

    contacts_loading: false,
    companies_loading: false,
    deals_loading: false,
    activities_loading: false,
    tickets_loading: false,
}



export default function(state =  initialState, action){
    // console.log("Reached Reducer with: ", action)
    switch(action.type){
        case GET_CONTACTS:
            var x ={...state,//returning the current state
                contacts:action.payload,
                contacts_loading: false,
            }
                // console.log(x)
            return x
        case CREATE_CONTACTS:
            var newContacts = state.contacts.push(action.payload.contact)
            var newActivities = state.contacts.push(action.payload.activity)


            var x ={...state,//returning the current state
                contacts: newContacts,
                activities: newActivities,
                contacts_loading: false,
                activities_loading:false
            }
                // console.log(x)
            return x    
        case DELETE_CONTACT:
            var newContacts =  state.contacts.forEach(contact => {
                if(contact._id !== action.payload){
                    return contact
                }
            })
            var x ={...state,//returning the current state
                contacts: newContacts,
                contacts_loading: false,
            }
                // console.log(x)
            return x
        case GET_COMPANIES:
            var x ={...state,//returning the current state
                companies:action.payload,
                companies_loading: false,
            }
                // console.log(x)
            return x
        case GET_ACTIVITIES:
                var x ={...state,//returning the current state
                    activities:action.payload,
                    activities_loading: false,
                }
                    // console.log(x)
                return x
        case GET_DEALS:
            var x ={...state,//returning the current state
                deals:action.payload,
                deals_loading: false,
            }
                // console.log(x)
            return x
        case UPDATE_DEAL:
            var newDeals = x["deals"].map(deal => {
                if(deal._id == action.payload._id){
                    deal = action.payload
                }
                return deal
            })
            var x = {
                ...state,
                deals: newDeals,
                deals_loading: false,
            }
            return x
        case GET_TICKETS:
            var x ={...state,//returning the current state
                tickets:action.payload,
                tickets_loading: false,
            }
                // console.log(x)
            return x
        case CONTACTS_LOADING :
            var x = { 
                ...state,
                contacts_loading:true
            }
            // console.log(x)
            return x
        case COMPANIES_LOADING :
            var x = { 
                ...state,
                companies_loading:true
            }
            // console.log(x)
            return x 
        case DEALS_LOADING :
            var x = { 
                ...state,
                deals_loading:true
            }
            // console.log(x)
            return x   
        case ACTIVITIES_LOADING :
            var x = { 
                ...state,
                activities_loading:true
            }
            // console.log(x)
            return x   
        case TICKETS_LOADING :
            var x = { 
                ...state,
                tickets_loading:true
            }
            // console.log(x)
            return x  
        default:
            return state;   
    }
}