import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from './store'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser} from './actions/authActions'
import { decode } from 'querystring';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing/Landing';
import Dashboard from './components/WMS/Dashboard';
import Storage from './components/WMS/Storage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import WMSPrivateRoute from './common/WMSprivate'
import CRMPrivateRoute from './common/CRMprivate'

import crm from './components/CRM/crm';
import ListContacts from './components/CRM/Contacts/ListContacts';
import Contact from './components/CRM/Contacts/Contact';
import ListCompanies from './components/CRM/Companies/ListCompanies'
import ListDeals from './components/CRM/Deals/ListDeals';
import ListTickets from './components/CRM/Tickets/ListTickets';
import CRMDashboard from './components/CRM/Dashboard'

import Booking from './components/WMS/Booking/Booking';
import BookingCreate from './components/WMS/Booking/BookingCreate';
import BookingEdit from './components/WMS/Booking/BookingEdit';
import ListActivities from './components/CRM/Activities/ListActivities';
import Company from './components/CRM/Companies/Company';
import Shipping from './components/WMS/Shipping';
import StatusEdit from './components/WMS/Shipping/StatusEdit';
import Deal from './components/CRM/Deals/Deal';
import StorageCreate from './components/WMS/Storage/StorageCreate';
import Grn from './components/WMS/Grn';
import GrnCreate from './components/WMS/Grn/GrnCreate';
import GrnEdit from './components/WMS/Grn/GrnEdit';
import PickList from './components/WMS/PickList/PickList';
import PickListCreate from './components/WMS/PickList/PickListCreate';
import PickListEdit from './components/WMS/PickList/PickListEdit';


import QuotationUpload from './components/Pricing/AddRates/QuotationUpload';
import ICDRates from './components/Pricing/ICDRates';

import ExcelUploading from './components/WMS/ExcelUploading/ExcelUploading';
import FCLRates from './components/Pricing/FCLRates';


  
//check for token
if(localStorage.jwtToken){
  //set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //decode the token and tget user info and exp
    const decoded = jwt_decode(localStorage.jwtToken)
    //set user and isauthenticated
    store.dispatch(setCurrentUser(decoded))

    //check for expiring token
    const currentTime = Date.now()/1000
    if(decode.exp < currentTime){
           //logout 
           store.dispatch(logoutUser())


           //dispatch clear current profile
       //    store.dispatch(clearCurrentProfile())

           //todo: clear current Profile
           //redirect to login
           window.location.href = '/login'
    }
}


class App extends Component {
  render(){
    return (
      <Provider store = {store}>
      <Router>
      <div className="App">
 
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    
      
    
      <Switch>
      <WMSPrivateRoute exact path="/wms" component={Dashboard}  />
      </Switch>
      <Switch>
      <WMSPrivateRoute exact path="/wms/storage" component={Storage}  />
      </Switch>
      <Switch>
      <WMSPrivateRoute exact path="/wms/storage/create" component={StorageCreate}  />
      </Switch>
      <Switch>
      <WMSPrivateRoute exact path="/wms/booking" component={Booking}  />
      </Switch>
      <Switch>
      <WMSPrivateRoute exact path="/wms/booking/create" component={BookingCreate}  />
      </Switch>

      <Switch>
      <WMSPrivateRoute exact path="/wms/booking/:id/edit" component={BookingEdit}  />
      </Switch>

      <Switch>
      <WMSPrivateRoute exact path="/wms/shipping" component={Shipping}  />
      </Switch>

      <Switch>
      <WMSPrivateRoute exact path="/wms/shipping/:id/editStatus" component={StatusEdit}  />
      </Switch>

      
      <Switch>
      <WMSPrivateRoute exact path="/wms/grn" component={Grn}  />
      </Switch>
        <Switch>
      <WMSPrivateRoute exact path="/wms/grn/create" component={GrnCreate}  />
      </Switch>
      
      <Switch>
      <WMSPrivateRoute exact path="/wms/grn/:id/edit" component={GrnEdit}  />
      </Switch>

      <Switch>
      <WMSPrivateRoute exact path="/wms/picklist" component={PickList}  />
      </Switch>
     
      <Switch>
      <WMSPrivateRoute exact path="/wms/picklist/create" component={PickListCreate}  />
      </Switch>
     
      <Switch>
      <WMSPrivateRoute exact path="/wms/picklist/:id/edit" component={PickListEdit}  />
      </Switch>

      <Switch>
      <WMSPrivateRoute exact path="/wms/excelupload" component={ExcelUploading}  />
      </Switch>


      <Switch>
        <Route exact path="/crm" component={CRMDashboard } />
        <Route exact path="/crm/contacts" component={ListContacts} />
        <Route exact path="/crm/contact/id/" component={Contact} />
        <Route exact path="/crm/companies" component={ ListCompanies } />
        <Route exact path="/crm/company/id/" component={ Company } />
        <Route exact path="/crm/deals/" component={ListDeals} />
        <Route exact path="/crm/tickets/" component={ListTickets} />
        <Route exact path="/crm/deal/id" component={Deal} />
        <Route exact path="/crm/activities/" component={ListActivities} />
      </Switch>

      <Switch>
        <Route exact path="/pricing/rates/icd" component={ICDRates} />
        <Route exact path="/pricing/rates/fcl" component={FCLRates} />
        <Route exact path="/pricing/rates/upload" component={QuotationUpload} />
        {/* <Route exact path="/pricing/rates/ad" component={RatesLanding} /> */}
      </Switch>

       </div>
      </Router>
      </Provider>
     
    );
  }
  
  }
  
  export default App;
  

