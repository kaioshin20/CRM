import React, { useState } from 'react'
import { Route, Switch, withRouter } from "react-router-dom";
import Dashboard from './Dashboard/index'
import Contacts from './Contacts/index'
import ListContacts from './Contacts/ListContacts';

const Routes = ({ match }) =>
    <Switch>
        {console.log(match)}
        <Route exact path={`${match.url}`} component={Dashboard} />
        <Route exact path={`${match.url}/contacts`} component={Contacts} />
        <Route exact path={`${match.url}/companies`} component={ListContacts} />
    </Switch>


export default withRouter(Routes)


//  localhost:3000/crm/
// localhost:3000/crm/contacts/
// localhost:3000/crm/contacts/1
// localhost:3000/crm/contacts/2
// localhost:3000/crm/companies
// 
