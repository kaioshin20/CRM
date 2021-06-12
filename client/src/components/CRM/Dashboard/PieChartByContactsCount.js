import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { getAllContacts } from '../../../actions/crmActions';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
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
			<text x={cx} y={cy-10} dy={8} textAnchor="middle" fill={fill}>
				{payload.name}
			</text>
			<text x={cx} y={cy+10} dy={8} textAnchor="middle" fill={fill}>
				{payload.value} deals
			</text>
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
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} deals`}</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

class PieChartByContactsCount extends PureComponent {
	constructor() {
		super();
		this.state = {
			stage1: 0,
			stage2: 0,
			stage3: 0
		};
	}

	componentDidMount() {
		this.props.getAllContacts();
	}
	
	componentWillReceiveProps(nextProps) {
		// console.log('in the annual bar', nextProps);
		if (nextProps.contacts) {
			const { contacts } = nextProps.contacts;
			this.setState({
				stage1: 0,
				stage2: 0,
				stage3: 0
			})
			
			let { stage1, stage2, stage3 } = this.state;
			let temp = nextProps.contacts.map((element) => {
				// console.log(element.stage)
				if (element.leadstage === 'Stage1') 
					stage1++;

				else if (element.leadstage === 'Stage2') 
					stage2++;

				else if (element.leadstage === 'Stage3') 
					stage3++;
			});
			// console.log({
			// 	stage1,
			// 	stage2,
			// 	stage3
			// })

			this.setState({
				stage1,
				stage2,
				stage3
			});
		}
	}

	static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

	state = {
		activeIndex: 1
	};

	onPieEnter = (data, index) => {
		this.setState({
			activeIndex: index
		});
	};

	render() {
		let { stage1, stage2, stage3 } = this.state;
		const data = [
			{
				name: 'Stage 1',
				value: stage1/4
			},
			{
				name: 'Stage 2',
				value: stage2/4
			},
			{
				name: 'Stage 3',
				value: stage3/4
			}
		];


		return (
			<Paper elevation={2}>
				<ResponsiveContainer width="100%">
					<div>
					PieChartByContactsCount 
						<div>
							<ResponsiveContainer width="100%" height={440}>
								<PieChart  height={440}>
									<Pie
										activeIndex={this.state.activeIndex}
										activeShape={renderActiveShape}
										data={data}
										cx="50%" cy="50%"
										innerRadius={70}
										outerRadius={90}
										fill="#8884d8"
										dataKey="value"
										onMouseEnter={this.onPieEnter}
									>
										{
											data.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index]}/>
											))
										}
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</ResponsiveContainer>
			</Paper>
		);
	}
}

const mapStateToProps = (state) => ({
	contacts: state.crm.contacts
});

export default connect(mapStateToProps, { getAllContacts })(PieChartByContactsCount);
