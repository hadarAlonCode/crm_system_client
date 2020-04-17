import React from 'react';
import * as actions from '../../../../../../actions/actions';
import { connect } from "react-redux";


function DataBox(props) {
    console.log(props.login)

    return (
        <div>

            <div>{`${props.value}${props.value_type}`}</div>
            <div>{props.data_text}</div>

            
        </div>
    );
}



function mapStateToProps({ login }) {
    return { login };
  }


export default connect(mapStateToProps,actions)(DataBox);

