import axios from 'axios'

import {ADD_GRN,GET_ERRORS,GET_ALL_GRN,GET_GRN_BY_ID
} from './types'



export const createNewGRN = (data,history) => dispatch =>{

    console.log("reached to create booking",data)
    axios.post('/api/wms/grn/creation',data)
    .then(
      res=>history.push("/wms")
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



export const getAllGrn = () => dispatch =>{

  console.log("reached to create booking")
  axios.get('/api/wms/grn/getAllgrn')
  .then((res)=>{
    console.log("omsode getallgrn",res.data)
    dispatch({
      type:GET_ALL_GRN,
      payload:res.data.AllGrn
    })}
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

export const getGRNById = (id) => dispatch =>{

  console.log("reached to create booking")
  axios.get(`/api/wms/grn/${id}/getGrnById`)
  .then((res)=>{
    console.log("omsode getallgrn",res.data.grn)
    dispatch({
      type:GET_GRN_BY_ID,
      payload:res.data.grn
    })}
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

export const editGRNById = (data,id,history) => dispatch =>{

  console.log("reached to create editing the grn")
  axios.post(`/api/wms/grn/edit/${id}/editGrnById`,data)
  .then(
    res=>history.push("/wms")
    )
  .catch(err=>{
    console.log("error in editing the grn ",err.response.data.message)
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
  }
    )
}

export const deleteGRNById = (id,history) => dispatch =>{

  console.log("reached to create editing the grn")
  axios.post(`/api/wms/grn/${id}/deleteGrnById`)
  .then(
    res=>history.push("/wms/grn")
    )
  .catch(err=>{
    console.log("error in editing the grn ",err.response.data.message)
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
  }
    )
}
