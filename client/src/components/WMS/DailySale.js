// import React, { PureComponent } from 'react';
// import {
//   PieChart, Pie, Sector, Cell,
// } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
//   { name: 'Group E', value: 300 }
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','pink'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
// }) => {
//    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// export default class DailySale extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

//   render() {
//     return (
    
//       <PieChart width={400} height={400}>
//         <Pie
//           data={data}
//           cx={200}
//           cy={200}
//           labelLine={false}
//           label={renderCustomizedLabel}
//           outerRadius={120}
//           fill="#8884d8"
//           dataKey="value"
//         >
        
//           {
//             data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
//           }
//         </Pie>
       
//       </PieChart>
   
//     );
//   }
// }

import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Legend,
} from 'recharts';

const data = [
  { name: 'Costmetics', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  { name: 'Group E', value: 500 }
];

export default class DailySale extends PureComponent {
  static jsfiddleUrl = '//jsfiddle.net/alidingling/6okmehja/';

  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
