import React from 'react'
import { Route, Switch, withRouter } from "react-router-dom";
import ListContacts from './ListContacts';
import Contact from './Contact';


const Routes = ({ match }) =>
    <Switch>
        {console.log(match)}
        <Route path={`${match.url}/1`} component={ListContacts} />
        <Route path={`${match.url}/2`} component={ListContacts} />
    </Switch>    
    

export default withRouter(Routes)
