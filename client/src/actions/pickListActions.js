import axios from 'axios'

import {ADD_PickList,GET_ERRORS,GET_ALL_PickList,GET_PickList_BY_ID
} from './types'



export const createNewPickList = (data,history) => dispatch =>{

    console.log("reached to create booking",data)
    axios.post('/api/wms/pickList/creation',data)
    .then(
      res=>history.push("/wms/picklist")
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



export const getAllPickList = () => dispatch =>{

  console.log("reached to create picklist")
  axios.get('/api/wms/pickList/getAllPickList')
  .then((res)=>{
    console.log("omsode getallPickList",res.data)
    dispatch({
      type:GET_ALL_PickList,
      payload:res.data.AllPickList
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

export const getPickListById = (id) => dispatch =>{

  console.log("reached to create booking")
  axios.get(`/api/wms/pickList/${id}/getPickListById`)
  .then((res)=>{
    console.log("omsode getallPickList",res.data.pickList)
    dispatch({
      type:GET_PickList_BY_ID,
      payload:res.data.pickList
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

export const editPickListById = (data,id,history) => dispatch =>{

  console.log("reached to create editing the PickList")
  axios.post(`/api/wms/pickList/edit/${id}/editPickListById`,data)
  .then(
    res=>history.push("/wms")
    )
  .catch(err=>{
    console.log("error in editing the PickList ",err.response.data.message)
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
  }
    )
}

export const deletePickListById = (id,history) => dispatch =>{

  console.log("reached to create editing the PickList")
  axios.post(`/api/wms/pickList/${id}/deletePickListById`)
  .then(
    res=>history.push("/wms/pickList")
    )
  .catch(err=>{
    console.log("error in editing the PickList ",err.response.data.message)
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
  }
    )
}
