import { combineReducers } from 'redux'
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import storageReducer from './storageReducer'
import bookingReducer from './bookingReducer'
import grnReducer from './grnReducers'

import crmReducer from './crmReducers'
import pricingReducer from './pricingReducers'

import pickListReducer from './pickListReducer'
export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    storage:storageReducer,
    booking:bookingReducer,
    grn:grnReducer,
    crm:crmReducer,
    pricing: pricingReducer,
    grn:grnReducer,
    pickList:pickListReducer
})

