import axios from 'axios'

import {GET_ALL_FROM_STORAGE,
    ADD_IN_STORAGE,
    GET_ERRORS
} from './types'




export const getAllFromStorage = () => dispatch =>{
 
    console.log("reached to storeage all get")
    axios.get("/api/wms/product/getAllFromStorage")
    .then(res=>{
        console.log("data in storeage--->",res.data.AllProducts)
        dispatch({
            type:GET_ALL_FROM_STORAGE,
              payload :res.data.AllProducts
        })
    })
    .catch(err=>{
        dispatch({
            type:GET_ERRORS,
              payload :{}
        })
    })
   
}





export const createNewEntry = (data,history) => dispatch =>{
 

    console.log("reached to create entry ",data)
       
    axios.post("/api/wms/product/add-product",data)
    .then( res=>history.push("/wms/storage"))
    .catch(err=>{
        console.log("error is herhe",err)
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
      
    })
   
}


export const getEntryById = (id) => dispatch =>{
 

    console.log("reached togetntri entry ",id)
       
 
   
}


