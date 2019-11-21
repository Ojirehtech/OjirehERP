import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyOtp } from "../../store/actions/action_loan";
import { sendOTP } from "../../store/actions/action_login";
import Loan from "./Loan";
import OtpForm from "./OtpForm";

class Container extends Component{
  state = {
    step: 0
  }

  onStepChange = () => {
    const { loan, login, verifyOtp, sendOTP } = this.props;
    if ( login.otpSuccess && login.otpSuccess === true ) {
      return <OtpForm loan={loan} verifyOtp={verifyOtp} />
    } else {
      return <Loan login={login} sendOTP={sendOTP} />
    }
  }
  
  render() {
    return (
      <div>
        {this.onStepChange()}
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    loan: state.loan,
    login: state.login,
    agent: state.agent
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    sendOTP: ( data ) => dispatch( sendOTP( data ) ),
    verifyOtp: ( data ) => dispatch( verifyOtp( data ) )
  }

  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Container );
