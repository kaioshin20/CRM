import axios from 'axios'

import {GET_ALL_BOOKING,ADD_BOOKING,EDIT_BOOKING,GET_ERRORS,GET_BOOKING_BY_ID
} from './types'




export const getAllBookings = () => dispatch =>{
 
    console.log("reached to booking all get")
    axios.get("/api/wms/product/getAllBooking")
    .then(res=>{
        console.log("data in booking--->",res.data.AllBookings)
        dispatch({
            type:GET_ALL_BOOKING,
              payload :res.data.AllBookings
        })
    })
    .catch(err=>{
        dispatch({
            type:GET_ERRORS,
              payload :{}
        })
    })
   
}

export const createNewBooking = (data,history) => dispatch =>{

    console.log("reached to create booking",data)
    axios.post('/api/wms/product/add-booking',data)
    .then(
      res=>history.push("/wms/booking")
      )
    .catch(err=>{
      console.log("error in booking ",err.response.data.message)
      dispatch({
          type:GET_ERRORS,
          payload:err.response.data
      })
    }
      )
}

export const getBookingById =  (id) => dispatch =>{
    console.log(" reach to getbookbyid",id)

    axios.get(`/api/wms/product/${id}/getbookingById`)
    .then(res=>{
console.log("res data in getbookingby id",res.data.Booked)
          dispatch({
            type:GET_BOOKING_BY_ID,
              payload :res.data.Booked
        })
    }
        
      )
    .catch(err=>{
      console.log("error in booking ",err.response)
      dispatch({
          type:GET_ERRORS,
          payload:{}
      })
    }
      )    




}


export const editBooking = (data,id,history) => dispatch  =>{
    
    

axios.post(`/api/wms/product/${id}/editBooking`,data)
    .then(
      res=>history.push("/wms/booking")
      )
    .catch(err=>{
      console.log("error in booking ",err.response.data.message)
      dispatch({
          type:GET_ERRORS,
          payload:err.response.data
      })
    }
      )
}


export const cancelOrder = (id,history) => dispatch =>{
  console.log("reach to canceclordr",id)

  axios.post(`/api/wms/product/${id}/cancelBooking`)
    .then(
      res=>history.push("/wms/booking")
      )
    .catch(err=>{
      console.log("error in booking ",err.response.data.message)
      dispatch({
          type:GET_ERRORS,
          payload:err.response.data
      })
    }
      )
}



export const editBookingStatus =  (shipping_status,id,history)  => dispatch =>{
console.log("---",shipping_status)
  axios.post(`/api/wms/product/${id}/alterStatus`,{shipping_status})
  .then(
    res=>history.push("/wms/shipping")
  )
  .catch(err=>{
    console.log("error in chaing status ",err.response.data.message)
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
  }
  ) 
}
