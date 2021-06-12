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

import {editPickListById} from '../../../../../actions/pickListActions'
import {deletePickListById} from '../../../../../actions/pickListActions'

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
class PickList extends Component {
    constructor(){
        super()
        this.state = {
            _id:"",
            Dispatch_no:"",
            Package_name:"",
            Fran_name:"",
            Customer_name:"",
            Box_no:"",
            Required_qty:0,
            Stack_qty:0,
            Transporter:"",
            Pallet_no:"",
            List:[],
            errors:""
        }
    }

    


    componentWillReceiveProps(nextProps){


        console.log("next pprosp adfadf",nextProps)
        const  { 
            _id,
            Dispatch_no,
            Package_name,
            Fran_name,
            Customer_name,
            Required_qty,
            Stack_qty,
            Box_no,
            Transporter,
            Pallet_no,
            List} = nextProps.picklist;

            this.setState({
                _id:_id,
                Dispatch_no:Dispatch_no,
                Package_name:Package_name,
                Fran_name:Fran_name,
                Customer_name:Customer_name,
                Required_qty:Required_qty,
                Stack_qty:Stack_qty,
                Box_no:Box_no,
                Transporter:Transporter,
                Pallet_no:Pallet_no,
                List:List
            })

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
    handleChange0(e){
        this.setState({ [e.target.name]: parseInt(e.target.value) })
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
        this.state.List[index].Fran_name = e.target.value
        this.setState({List: this.state.List})
    }
    handleChange4(e,index){
        this.state.List[index].Box_no = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }
    
    handleChange5(e,index){
        this.state.List[index].Box_qty = parseInt(e.target.value)
        this.setState({List: this.state.List})
    }

    handleDelete(){
        this.props.deletePickListById(this.state._id,this.props.history)

    }
    handleSubmit(){

        const  { Dispatch_no,
            Package_name,
            Fran_name,
            Customer_name,
            Required_qty,
            Stack_qty,
            Box_no,
            Transporter,
            Pallet_no,
            List} = this.state;
        
        
                if(List.length ==0 ||
                    Dispatch_no.length ==0 ||
                    Package_name.length ==0 ||
                    Customer_name.length ==0 ||
                    Box_no.length ==0 ||
                    Transporter.length ==0 ||
                    Pallet_no.length ==0
                  )
                {
                    this.setState({errors:'Cannot submit Incomplete form'})
        
                    return;
        
                }
        
        
                List.forEach((element)=>{
        
                    if(element.length < 5){
                            this.setState({errors:'Please fill the form properly!'})
                            return;
                    }
                })
        
        
        
        
                console.log("submiteed data is",this.state)
                    this.props.editPickListById(this.state,this.state._id,this.props.history)
        
    }

    render() {

        
//        console.log("picklist in eid",this.props)
        const  { Dispatch_no,
            Package_name,
            Fran_name,
            Customer_name,
            Required_qty,
            Stack_qty,
            Box_no,
            Transporter,
            Pallet_no,
            List} = this.state;

        const {classes} = this.props
        return (
           
            <div>
            <main className={classes.main}>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
			Edit A PickList
			   </Typography>
            {this.state.errors !== ""   ? 
           
            <div className={classes.rootAlert}>
            <Alert severity="error" onClose={() => {this.setState({errors:""})}}>{this.state.errors}</Alert>
          
          
          </div>


             : null}

             <Grid container spacing={3}>
             
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Dispatch_no">Dispatch no</InputLabel>
             <Input id="Dispatch_no"  name="Dispatch_no" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Dispatch_no} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Package_name">Package name</InputLabel>
             <Input id="Package_name" name="Package_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Package_name} />
         </FormControl>
                       
             </Grid>
            
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Fran_name">Francise Name</InputLabel>
             <Input id="Fran_name" name="Fran_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Fran_name} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Customer_name">Customer_name</InputLabel>
             <Input id="Customer_name" name="Customer_name" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Customer_name} />
         </FormControl>
                       
             </Grid>


             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Box_no">Box no.</InputLabel>
             <Input id="Box_no" name="Box_no" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Box_no} />
         </FormControl>
                       
             </Grid>
        

             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Required_qty">Required qty.</InputLabel>
             <Input id="Required_qty" name="Required_qty"  type="number" autoComplete="off" autoFocus onChange={(e)=> this.handleChange0(e)} value={Required_qty} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Stack_qty">Stack qty.</InputLabel>
             <Input id="Stack_qty" name="Stack_qty" autoComplete="off" type="number" autoFocus onChange={(e)=> this.handleChange0(e)} value={Stack_qty} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Transporter">Transporter</InputLabel>
             <Input id="Transporter" name="Transporter" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Transporter} />
         </FormControl>
                       
             </Grid>
             <Grid item xs={12} sm = {6}>
             <FormControl margin="normal" required fullWidth>
             <InputLabel htmlFor="Pallet_no">Pallet Number</InputLabel>
             <Input id="Pallet_no" name="Pallet_no" autoComplete="off" autoFocus onChange={(e)=> this.handleChange(e)} value={Pallet_no} />
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
                           <InputLabel htmlFor="Fran_name">Francise Name</InputLabel>
                           <Input id="Fran_name" name="Fran_name"  autoComplete="off" autoFocus onChange={(e)=> this.handleChange3(e,index)} value={element.Fran_name} />
                       </FormControl>
                            
                           </Grid>
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Box_no">Box no.</InputLabel>
                           <Input id="Box_no" name="Box_no" autoComplete="off" type = "number" autoFocus onChange={(e)=> this.handleChange4(e,index)} value={element.Box_no} />
                       </FormControl>
                           
                           </Grid>
                          
                           <Grid item xs={12} sm = {3}>
                           <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="Box_qty">Box Qty.</InputLabel>
                           <Input id="Box_qty" name="Box_qty"  autoComplete="off" autoFocus type = "number" onChange={(e)=> this.handleChange5(e,index)} value={element.Box_qty} />
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
</IconButton>
        
<Button
variant="contained"
color="primary"
size="small"
onClick={()=> this.handleSubmit()}
className={classes.button}
startIcon={<SaveIcon />}
>
Edit and Save
</Button>
        
<Button
variant="contained"
color="secondary"
size="small"
onClick={()=> this.handleDelete()}
className={classes.button}
startIcon={<SaveIcon />}
>
Remove
</Button>

        </Paper>
        </main>
        </div>
        
        
                
        )
    }
}




PickList.propType={
    editPickListById : PropTypes.func.isRequired,
    deletePickListById : PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

const mapStateToProps = (state) => ({
    errors:state.errors,
    pickList:state.picklist
})

//connect(mapStateToProps,{createNewBooking})
export default connect(mapStateToProps,{editPickListById,deletePickListById})(withRouter(withStyles(styles)(PickList)));

//export default Grn