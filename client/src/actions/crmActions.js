import {GET_CONTACTS, CREATE_CONTACTS, UPDATE_DEAL, DELETE_CONTACT, CONTACTS_LOADING, GET_COMPANIES, COMPANIES_LOADING, GET_DEALS, DEALS_LOADING, GET_ACTIVITIES, ACTIVITIES_LOADING, GET_TICKETS, TICKETS_LOADING,  GET_ERRORS} from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


// CONTACT
// GET ALL
export const getAllContacts = () => dispatch => {
    console.log("Reached Action")
    dispatch(setContactsLoading())
    axios.get('/api/contacts/all')
        .then(res => 
            {//console.log(res.data)
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in fetching contacts",err)
            // this.setState({errors: err.response.data})
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// CREATE
export const createContact = (data) => dispatch => {
    console.log("Reached Action Create contact")
    dispatch(setContactsLoading())
    dispatch(setActivitiesLoading())
    axios.post('/api/contacts/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllContacts())
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating contact ", data.fname+data.lname , err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}
// EDIT
export const editContact = (data) => dispatch => {
    console.log("Reached Action Edit contact", data)
    dispatch(setContactsLoading())
    dispatch(setActivitiesLoading())
    axios.post(`/api/contacts/edit/${data._id}`, data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllContacts())
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating contact ", data.fname+data.lname , err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// DELETE ONE OR MULTIPLE
export const deleteContactsWithId = (ids) => dispatch => {
    console.log("Reached Action")
    dispatch(setContactsLoading())
    axios.delete(`/api/contacts/delete/id/${ids.join(':;')}`,)
        .then(res => 
            {//console.log(res.data)
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in deleting deals ", ids, err.response.data.message)
            // this.setState({errors: err.response.data})
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// COMPANIES
// GET ALL
export const getAllCompanies = () => dispatch => {
    console.log("Reached Action")
    dispatch(setCompaniesLoading())
    axios.get('/api/companies/all')
        .then(res => 
            {//console.log(res.data)
            dispatch({
                type: GET_COMPANIES,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in fetching deals",err)
            // this.setState({errors: err.response.data})
            // dispatch( {
            //     type:GET_ERRORS,
            //     payload:err.response.data
            // })
        })

}
// CREATE
export const createCompany = (data) => dispatch => {
    console.log("Reached Action Create contact")
    dispatch(setCompaniesLoading())
    dispatch(setActivitiesLoading())
    axios.post('/api/companies/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllCompanies())
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating contact ", data.fname+data.lname , err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// EDIT
export const editCompany = (data) => dispatch => {
    console.log("Reached Action Edit company", data)
    dispatch(setCompaniesLoading())
    dispatch(setActivitiesLoading())
    axios.post(`/api/companies/edit/${data._id}`, data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllCompanies())
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating company ", data.name , err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// DELETE ONE OR MULTIPLE
export const deleteCompaniesWithId = (ids) => dispatch => {
    console.log("Reached Action")
    dispatch(setCompaniesLoading())
    axios.delete(`/api/companies/delete/id/${ids.join(':;')}`,)
        .then(res => 
            {//console.log(res.data)
            dispatch({
                type: GET_COMPANIES,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in deleting deals ", ids, err.response.data.message)
            // this.setState({errors: err.response.data})
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}


// DEALS
// GET ALL
export const getAllDeals = () => dispatch => {
    console.log("Reached Action")
    dispatch(setDealsLoading())
    axios.get('/api/deals/all')
        .then(res => 
            {//console.log(res.data)
            dispatch({
                type: GET_DEALS,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in fetching deals",err)
            // this.setState({errors: err.response.data})
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })

}
// CREATE
export const createDeal = (data) => dispatch => {
    console.log("Reached Action Create deal")
    dispatch(setDealsLoading())
    dispatch(setActivitiesLoading())
    axios.post('/api/deals/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllDeals())
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating deal ", data.name, err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// UPDATE DEAL STAGE

export const updateDealStage = (id, stage) => dispatch => {
    axios.post(`/api/deals/update/stage/`, {id, stage})
        .then(res => {
           dispatch(getAllDeals());
        })
        .catch(err => {
          console.log(err)  
        })
}



// ACTIVITIES
// GET ALL
export const getAllActivities = () => dispatch => {
    console.log("Reached Action")
    dispatch(setActivitiesLoading())
    axios.get('/api/activity/all')
        .then(res => 
            {//console.log(res.data)
            dispatch({
                type: GET_ACTIVITIES,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in fetching activities",err.response.data.message)
            // this.setState({errors: err.response.data})
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })

}
// CREATE
export const createActivity = (data) => dispatch => {
    console.log("Reached Action Create Activity")
    dispatch(setActivitiesLoading())
    axios.post('/api/activity/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating activity ", data.name, err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// TICKETS
// GET ALL
export const getAllTickets = () => dispatch => {
    console.log("Reached Action")
    dispatch(setActivitiesLoading())
    axios.get('/api/tickets/all')
        .then(res => 
            {//console.log(res.data)
            dispatch({
                type: GET_TICKETS,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log("error in fetching deals",err.response.data.message)
            // this.setState({errors: err.response.data})
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })

}

// CREATE
export const createTicket = (data) => dispatch => {
    console.log("Reached Action Create Ticket")
    dispatch(setTicketLoading())
    dispatch(setActivitiesLoading())
    axios.post('/api/tickets/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllDeals())
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating ticket ", data.name, err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// UPDATE TICKET STATUS
export const updateTicketStatus = (id, status) => dispatch => {
    axios.post(`/api/tickets/update/status/`, {id, status})
        .then(res => {
           dispatch(getAllTickets());
        })
        .catch(err => {
          console.log(err)  
        })
}

// Event
// CREATE
export const createEvent = (data) => dispatch => {
    console.log("Reached Action Create Event")
    dispatch(setActivitiesLoading())
    axios.post('/api/events/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating event ", data.name, err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

// NOTE
// CREATE
export const createNote = (data) => dispatch => {
    console.log("Reached Action Create Note")
    dispatch(setActivitiesLoading())
    axios.post('/api/notes/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating note ", data.for, err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}


// MEETING
// CREATE
export const createMeeting = (data) => dispatch => {
    console.log("Reached Action Create Meeting")
    dispatch(setActivitiesLoading())
    axios.post('/api/meetings/create/', data)
        .then(res => {
            console.log(res.data)
            dispatch(getAllActivities())
        })
        .catch(err => {
            console.log("error in creating meeting ", data.for, err.response.data.message)
            dispatch( {
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}



// ALL LOADINGS
export const setContactsLoading = () => {
    return {
        type: CONTACTS_LOADING
    }
}
export const setCompaniesLoading = () => {
    return {
        type: COMPANIES_LOADING
    }
}
export const setDealsLoading = () => {
    return {
        type: DEALS_LOADING
    }
}

export const setActivitiesLoading = () => {
    return {
        type: ACTIVITIES_LOADING
    }
}

export const setTicketLoading = () => {
    return {
        type: TICKETS_LOADING
    }
}