import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import {connect } from 'react-redux';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import {createNewGRN} from '../../../../../actions/grnActions'



const styles = theme => ({
    rootAlert: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
	main: {
		width: '100%',
		display: 'block', 
		marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
	marginTop: theme.spacing.unit * 15,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 1000,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		// marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
      width: theme.spacing(20),
      height: theme.spacing(20)
    },
    button: {
        margin: theme.spacing(1),
        align:'center'
      },
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	large:{
		width: theme.spacing(20),
		height: theme.spacing(20) 
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 2,
	},
});
class GrnForm extends Component {
    constructor(){
        super()
        this.state = {
            Warehouse_code:"",
    Warehouse_name:"",
    Depositor_code:"",
    Depositor_name:"",
    Supplier_code:"",
    Supplier_name:"",
    Shelf_code:"",
    Shelf_name:"",
    Zone_code:"",
    Zone_name:"",
            List:[],
            errors:""
        }
    }


    addField(){
        this.setState({List:[...this.state.List,{}]})
    }

    handleRemove(index){
        this.state.List.splice(index,1)
    
        this.setState({List:this.state.List})
    
    }

    handleChange(e){
        this.setState({ [e.target.name]:e.target.value })
    }


    handleChange1(e,index){
        this.state.List[index].Item_code = e.target.value
        this.setState({List: this.state.List})
    }
    handleChange2(e,index){
        this.state.List[index].Item_description = e.target.value
        this.setState({List: this.state.List})
    }
    handleChange3(e,index){
        this.state.List[index].Container_quantity = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }
    handleChange4(e,index){
        this.state.List[index].Total_quantity = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }
    
    handleChange5(e,index){
        this.state.List[index].Unit_price = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }
    handleChange11(e,index){
        this.state.List[index].Total_price = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }
    handleChange6(e,index){
        this.state.List[index].Product_status = e.target.value
        this.setState({List: this.state.List})
    }
    handleChange7(e,index){
        this.state.List[index].Accepted_qty = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }
    handleChange8(e,index){
        this.state.List[index].Rejected_qty = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }
    handleChange9(e,index){
        this.state.List[index].Depositor_currency = e.target.value
        this.setState({List: this.state.List})
    }
    handleChange10(e,index){
        this.state.List[index].Exchange_rate = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }


    handleSubmit(){

const  {List, Warehouse_code,
    Warehouse_name,
    Depositor_code,
    Depositor_name,
    Supplier_code,
    Supplier_name,
    Shelf_code,
    Shelf_name,
    Zone_code,
    Zone_name} = this.state;


        if(List.length ==0 ||
             Warehouse_code.length ==0 ||
            Warehouse_name.length ==0 ||
            Depositor_code.length ==0 ||
            Depositor_name.length ==0 ||
            Supplier_code.length ==0 ||
            Supplier_name.length ==0 ||
            Shelf_code.length ==0 ||
            Shelf_name.length ==0 ||
            Zone_code.length ==0 ||
            Zone_name.length ==0)
        {
            this.setState({errors:'Cannot submit Incomplete form'})

            return;

        }


        List.forEach((element)=>{

            if(element.length < 11){
                    this.setState({errors:'Please fill the form properly!'})
                    return;
            }
        })




        console.log("submiteed data is",this.state)
    this.props.createNewGRN(this.state,this.props.history)
        
    }

    render() {

        const {
            Warehouse_code,
    Warehouse_name,
    Depositor_code,
    Depositor_name,
    Supplier_code,
    Supplier_name,
    Shelf_code,
    Shelf_name,
    Zone_code,
    Zone_name
        } = this.state

        const {classes} = this.props
        return (
            <div>
            <main className={classes.main}>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
			Create A New GRN
			   </Typography>
            {this.state.errors !== ""   ? 
           
            <div className={classes.rootAlert}>
            <Alert severity="error" onClose={() => {this.setState({errors:""})}}>{this.state.errors}</Alert>
          
          
          </div>


             : null}

             <Grid container spacing={3}>
             
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Warehouse_code">Warehouse code</InputLabel>
             <Input id="Warehouse_code" name="Warehouse_code" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Warehouse_code} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Warehouse_name">Warehouse name</InputLabel>
             <Input id="Warehouse_name" name="Warehouse_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Warehouse_name} />
         </FormControl>
                       
             </Grid>
            
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Depositor_code">Depositor code</InputLabel>
             <Input id="Depositor_code" name="Depositor_code" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Depositor_code} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Depositor_name">Depositor name</InputLabel>
             <Input id="Depositor_name" name="Depositor_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Depositor_name} />
         </FormControl>
                       
             </Grid>


             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Supplier_code">Supplier code</InputLabel>
             <Input id="Supplier_code" name="Supplier_code" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Supplier_code} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Supplier_name">Supplier name</InputLabel>
             <Input id="Supplier_name" name="Supplier_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Supplier_name} />
         </FormControl>
                       
             </Grid>

             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Shelf_code">Shelf code</InputLabel>
             <Input id="Shelf_code" name="Shelf_code" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Shelf_code} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Shelf_name">Shelf name</InputLabel>
             <Input id="Shelf_name" name="Shelf_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Shelf_name} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Zone_code">Zone code</InputLabel>
             <Input id="Zone_code" name="Zone_code" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Zone_code} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Zone_name">Zone name</InputLabel>
             <Input id="Zone_name" name="Zone_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Zone_name} />
         </FormControl>
                       
             </Grid>
         
             </Grid>

               {
                   this.state.List.map((element,index)=>{
                   
                
                    return (

                    
                           <div key = {index}>
                           <Grid container spacing={3}>
                         
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Item_code">Item Code</InputLabel>
                           <Input id="Item_code" name="Item_code" autoComplete="off" autoFocus onChange={(e)=> this.handleChange1(e,index)} value={element.Item_code} />
                       </FormControl>
                                     
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Item_description">Description</InputLabel>
                           <Input id="Item_description" name="Item_description"   autoComplete="off"  autoFocus onChange={(e)=> this.handleChange2(e,index)} value={element.Item_description} />
                       </FormControl>
                           
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Container_quantity">Container Quantity</InputLabel>
                           <Input id="Container_quantity" name="Container_quantity" type = "number" autoComplete="off" autoFocus onChange={(e)=> this.handleChange3(e,index)} value={element.Container_quantity} />
                       </FormControl>
                            
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Total_quantity">Total Quantity</InputLabel>
                           <Input id="Total_quantity" name="Total_quantity" autoComplete="off" type = "number" autoFocus onChange={(e)=> this.handleChange4(e,index)} value={element.Total_quantity} />
                       </FormControl>
                           
                           </Grid>
                          
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Unit_price">Unit Price</InputLabel>
                           <Input id="Unit_price" name="Unit_price" autoComplete="off" autoFocus type = "number" onChange={(e)=> this.handleChange5(e,index)} value={element.Unit_price} />
                       </FormControl>
                                     
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Total_price">Total Price</InputLabel>
                           <Input id="Total_price" name="Total_price"   autoComplete="off" type = "number" autoFocus onChange={(e)=> this.handleChange11(e,index)} value={element.Total_price} />
                       </FormControl>
                           
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Product_status">Product Status</InputLabel>
                           <Input id="Product_status" name="Product_status" autoComplete="off" autoFocus onChange={(e)=> this.handleChange6(e,index)} value={element.Product_status} />
                       </FormControl>
                            
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Accepted_qty">Accept Qty.</InputLabel>
                           <Input id="Accepted_qty" name="Accepted_qty" autoComplete="off" type = "number" autoFocus onChange={(e)=> this.handleChange7(e,index)} value={element.Accepted_qty} />
                       </FormControl>
                           
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Rejected_qty">Rejected Qty.</InputLabel>
                           <Input id="Rejected_qty" name="Rejected_qty" autoComplete="off" type = "number" autoFocus onChange={(e)=> this.handleChange8(e,index)} value={element.Rejected_qty} />
                       </FormControl>
                           
                           </Grid>
                          
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Depositor_currency">Depositor Currency</InputLabel>
                           <Input id="Depositor_currency" name="Depositor_currency" autoComplete="off" autoFocus onChange={(e)=> this.handleChange9(e,index)} value={element.Depositor_currency} />
                       </FormControl>
                           
                           </Grid>

                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Exchange_rate">Exchange Rate</InputLabel>
                           <Input id="Exchange_rate" name="Exchange_rate" type = "number" autoComplete="off" autoFocus onChange={(e)=> this.handleChange10(e,index)} value={element.Exchange_rate} />
                       </FormControl>
                           
                           </Grid>

                           <IconButton aria-label="delete" onClick={()=> this.handleRemove(index)} className={classes.button}>
          <DeleteIcon fontSize="large" />
        </IconButton>
                         
                          
                            </Grid>
                
                      
                            
                                </div>
                       )
                   })
               }


               <hr/>

               <IconButton color="primary" onClick={(e)=> this.addField(e)} className={classes.button} aria-label="add to shopping cart">
  <AddShoppingCartIcon />
  Add Item in List
</IconButton>
        
<Button
variant="contained"
color="primary"
size="small"
onClick={()=> this.handleSubmit()}
className={classes.button}
startIcon={<SaveIcon />}
>
Save
</Button>
        
        </Paper>
        </main>
        </div>
        )
    }
}




GrnForm.propType={
    createNewGRN : PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

const mapStateToProps = (state) => ({
    errors:state.errors
})

//connect(mapStateToProps,{createNewBooking})
export default connect(mapStateToProps,{createNewGRN})(withRouter(withStyles(styles)(GrnForm)));

//export default Grn