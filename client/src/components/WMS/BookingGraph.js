import React,{Component} from "react";
import {Area, AreaChart, ResponsiveContainer, XAxis} from "recharts";
import {getAllBookings} from '../../actions/bookingActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'



class BookingGraph extends Component {
   constructor(){
       super();
       this.state = {
        JAN:0,
        FEB:0,
        MAR:0,
        APR:0,
        MAY:0,
        JUNE:0,
        JULY:0,
        AUG:0,
        SEP:0,
        OCT :0,
        NOV:0,
        DEC:0
       }
   }


    componentDidMount(){
        this.props.getAllBookings();
      }
    

componentWillReceiveProps(nextProps){
    
    if(nextProps.booking){
 const {booking} = nextProps.booking

 console.log("----------------------",booking)

let { JAN,
    FEB,
    MAR,
    APR,
    MAY,
    JUNE,
    JULY,
    AUG,
    SEP,
    OCT ,
    NOV,
    DEC} = this.state;
 booking.forEach((e)=>{
     console.log("---",e.created)
     var p = new Date(e.created)
     console.log(p.getMonth())
     p = p.getMonth();

     if(p==0)
         JAN++;
         if(p==1)
         FEB++;
         if(p==2)
         MAR++;
         if(p==3)
         APR++;
         if(p==4)
         MAY++;
         if(p==5)
         JUNE++;
         if(p==6)
         JULY++;
         if(p==7)
         AUG++;
         if(p==8)
         SEP++;
         if(p==9)
         OCT++;
         if(p==10)
         NOV++;
         if(p==11)
         DEC++;

 })


 this.setState({
    JAN,
    FEB,
    MAR,
    APR,
    MAY,
    JUNE,
    JULY,
    AUG,
    SEP,
    OCT ,
    NOV,
    DEC
 })
    }
}

    render() {


        const { JAN,
            FEB,
            MAR,
            APR,
            MAY,
            JUNE,
            JULY,
            AUG,
            SEP,
            OCT ,
            NOV,
            DEC} = this.state;

        const data = [
            {name: '', pv: 0},
            {name: 'JAN', pv: JAN},
            {name: 'FEB', pv: FEB},
            {name: 'MAR', pv: MAR},
            {name: 'APR', pv: APR},
            {name: 'MAY', pv: MAY},
            {name: 'JUNE', pv: JUNE},
            {name: 'JULY', pv: JULY},
            {name: 'AUG', pv: AUG},
            {name: 'SEP', pv: SEP},
            {name: 'OCT', pv: OCT},
            {name: 'NOV', pv: NOV},
            {name: 'DEC', pv: DEC},
            {name: '', pv: 0},
            {name: '', pv: 0},
          ];
        return (
            <div>
                
    <ResponsiveContainer width="100%">
    <div>
    <div className="d-flex flex-row px-4 pt-3">
    <h4 className="mb-3">Booking History</h4>
    </div>
      <div >
        <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}
        margin={{top: 0, right: 0, left: 0, bottom: 0}}>

<XAxis dataKey="name"/>
<defs>
 <linearGradient id="color15" x1="0" y1="0" x2="0" y2="1">
   <stop offset="5%" stopColor="#ffdfaf" stopOpacity={0.8}/>
   <stop offset="95%" stopColor="#ffffff" stopOpacity={0.8}/>
 </linearGradient>
</defs>
<Area dataKey='pv' strokeWidth={2} stackId="2" stroke='#ff9e10' fill="url(#color15)"
     fillOpacity={1}/>
</AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </ResponsiveContainer>


            </div>
        )
    }
}




Storage.propTypes = {
    getAllBookings: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  booking: state.booking
});


export default connect(mapStateToProps,{getAllBookings})(BookingGraph);


//export default BookingGraph
// <div className="d-flex flex-row px-4 pt-3">
// <h4 className="mb-3">Balance History</h4>
// </div>

