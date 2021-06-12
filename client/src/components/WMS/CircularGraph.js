import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector,ResponsiveContainer } from 'recharts';
import {getAllFromStorage} from '../../actions/storageActions'
import {connect} from 'react-redux'

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class CircularGraph extends PureComponent {


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




  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

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
          name: 'Furniture',  value: furnitures/2, 
        },
        {
          name: 'Clothing',  value: clothings/2,   },
        {
          name: 'Medicines',  value: medicines/2,   },
        {
          name: 'Footwears',  value: footwears/2,   },
        {
          name: 'Cosmetics',  value: cosmetics/2,   },
      ];



    return (



      <ResponsiveContainer width="100%">
      <div>
       
        <div >
          <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={200}
          cy={200}
          innerRadius={100}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        />
      </PieChart>
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


export default connect(mapStateToProps,{getAllFromStorage})(CircularGraph);

