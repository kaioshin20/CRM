import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux' // connects a react component to react store 
import PropTypes from 'prop-types'

const WMSPrivateRoute = ({component: Component, auth, ...rest})=> (
 <Route 
   {...rest} 
   render = {props=>
     (auth.isAuthenticated  === true && auth.user.data.role ==="wms") ?(
         <Component {...props} />
       ) :
       (
         <Redirect to ="/login" />
       )
 }
 />
)


WMSPrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth
})


export default connect(mapStateToProps)(WMSPrivateRoute)
