import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class BarChartBox extends Component {

  render() {
    const {chart_data , name , dataA , dataB , dataA_name , dataB_name } = this.props

  return (
    <div className="bar__chart">

      {chart_data.length > 0 ? 
      
      <BarChart
      width={500}
      height={300}
      data={chart_data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={name} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataA} name={dataA_name} fill="#23074d" />
      <Bar dataKey={dataB} name={dataB_name} fill="#ff7c57" />
     </BarChart>

    : 
    
    <div className="no__contacts__chart">No Contacts</div>
    
    }
     
    
    </div>
  );
 }

}

