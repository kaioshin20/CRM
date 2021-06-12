import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

import {connect} from 'react-redux'

import {getAllFromStorage} from '../../actions/storageActions'



// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];

 class StorageLineGraph extends PureComponent {
    constructor(){
        super();
        this.state={
            furnitures:0,
            medicines:0,
            cosmetics:0,
            footwears:0,
            clothings:0,
        }
    }


        componentDidMount(){
            this.props.getAllFromStorage();

            
        
          }

    componentWillReceiveProps(nextProps){
    console.log("in the annual bar",nextProps)
    if(nextProps.storage){
        const {storage} = nextProps.storage
        let {
            furnitures,
            medicines,
            cosmetics,
            footwears,
            clothings,
        } = this.state
     let temp = storage.map((element)=>{
if(element.category === "furniture")
     furnitures++;

     if(element.category === "medicines")
     medicines++;

     if(element.category === "cosmetics")
     cosmetics++;

     if(element.category === "footwear")
     footwears++;

     if(element.category === "clothing")
     clothings++;
     })

     this.setState({ furnitures,
        medicines,
        cosmetics,
        footwears,
        clothings})

    }
    }

      
  render() {
    let {
        furnitures,
        medicines,
        cosmetics,
        footwears,
        clothings,
    } = this.state
    const data = [
        {
          name: 'Furniture',  pv: furnitures/2, 
        },
        {
          name: 'Clothing',  pv: clothings/2,   },
        {
          name: 'Medicines',  pv: medicines/2,   },
        {
          name: 'Footwears',  pv: footwears/2,   },
        {
          name: 'Cosmetics',  pv: cosmetics/2,   },
      ];
    return (

        <ResponsiveContainer width="100%">
        <div>
         
          <div >
            <ResponsiveContainer width="100%" height={400}>
            <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ResponsiveContainer>

    
    );
  }
}


const mapStateToProps = state => ({
    storage: state.storage
  })  


export default connect(mapStateToProps,{getAllFromStorage})(StorageLineGraph);

