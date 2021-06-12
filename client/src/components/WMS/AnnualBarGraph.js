import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';
import {connect} from 'react-redux'

import {getAllFromStorage} from '../../actions/storageActions'

class AnnualBarGraph extends PureComponent {
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
        <BarChart
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
        <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>
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


export default connect(mapStateToProps,{getAllFromStorage})(AnnualBarGraph);


// import React from 'react';
// import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

// const data = [
//   {name: 'Page A', uv: 4000},
//   {name: 'Page B', uv: 3000},
//   {name: 'Page C', uv: 2000},
//   {name: 'Page D'},
//   {name: 'Page E', uv: 1890},
//   {name: 'Page F', uv: 2390},
//   {name: 'Page G', uv: 3490},
// ];
// const AnnualBarGraph = () => (
//   <ResponsiveContainer width="100%">
//     <div>
//       <div className="mb-5">
//         <ResponsiveContainer width="100%" height={200}>
//           <AreaChart data={data}
//                      margin={{top: 10, right: 0, left: -25, bottom: 0}}>
//             <XAxis dataKey="name"/>
//             <YAxis/>
//             <CartesianGrid strokeDasharray="3 3"/>
//             <Tooltip/>
//             <Area type='monotone' dataKey='uv' stroke='#3367d6' fill='#3367d6'/>
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="mb-4">
//         <ResponsiveContainer width="100%" height={200}>
//           <AreaChart data={data}
//                      margin={{top: 10, right: 0, left: -25, bottom: 0}}>
//             <XAxis dataKey="name"/>
//             <YAxis/>
//             <CartesianGrid strokeDasharray="3 3"/>
//             <Tooltip/>
//             <Area connectNulls={true} type='monotone' dataKey='uv' stroke='#3367d6' fill='#3367d6'/>
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   </ResponsiveContainer>
// );

// export default AnnualBarGraph;





// <BarChart
// width={500}
// height={300}
// data={data}
// margin={{
//   top: 5, right: 30, left: 20, bottom: 5,
// }}
// >
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis dataKey="name" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Bar dataKey="pv" fill="#8884d8" />
// </BarChart>