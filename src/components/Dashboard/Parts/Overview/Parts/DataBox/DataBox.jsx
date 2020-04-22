import React from 'react';
import * as actions from '../../../../../../actions/actions';
import { connect } from "react-redux";
import CountUp from 'react-countup';


function DataBox(props) {

    return (
        <div className="data__box__container">
 
            <div className="data__box__num">
            <CountUp start={0} end={Number(props.value)} duration={3} useEasing={true} decimals={1}/>{props.value_type}</div>
            <div>{props.data_text}</div>
          
        </div>
    );
}



function mapStateToProps({ login }) {
    return { login };
  }


export default connect(mapStateToProps,actions)(DataBox);

