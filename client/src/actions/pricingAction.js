import { SET_DATA, RATES_LOADING, SET_RATES } from './types'
import axios from 'axios'


// RATES
// GET ALL
export const getAllRates = (data) => dispatch => {
    console.log("Reached Action getAllRates")
    dispatch(setRatesLoading())
    axios.post('/api/pricing/rates', data)
        .then(res => 
            {
            dispatch({
                type: SET_RATES,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in fetching rates",err)
        })
}

// CREATE
export const uploadRates = (data) => dispatch => {
    console.log("Reached Action uploadRates")
    dispatch(setRatesLoading())
    axios.post('/api/pricing/rates/add', data)
        .then(res => {
            dispatch(getAllRates())
            console.log(res.data)
            return true
        })
        .catch(err => {
            console.log("error in uploading rates ",err)
            return false
        })
}

// EDIT
export const editRates = (data) => dispatch => {
    console.log("Reached Action editRates")
    dispatch(setRatesLoading())
    axios.post('/api/pricing/rates/edit', data)
        .then(res => {
            dispatch(getAllRates())
            console.log(res.data)
            return true
        })
        .catch(err => {
            console.log("error in editing rates ",err)
            return false
        })
}

// EDIT
export const deleteRates = (data) => dispatch => {
    console.log("Reached Action deleteRates")
    dispatch(setRatesLoading())
    axios.post('/api/pricing/rates/delete', data)
        .then(res => {
            dispatch(getAllRates())
            console.log(res.data)
            return true
        })
        .catch(err => {
            console.log("error in deleting rates ",err)
            return false
        })
}


export const setRatesLoading = () => {
    return {
        type: RATES_LOADING
    }
}