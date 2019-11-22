import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { verifyOtp, generateOtp } from "../../store/actions/action_loan";
import { sendOTP } from "../../store/actions/action_login";
import Loan from "./Loan";
import OtpForm from "./OtpForm";
import { getUser } from "../../store/actions/action_user";

class Container extends Component{
  state = {
    step: 0
  }

  async componentDidMount() {
    const { getUser } = this.props;
    try {
      await getUser();
    } catch(err) {}
  }

  onStepChange = () => {
    const { loan, login, verifyOtp } = this.props;
    if ( login.otpSuccess && login.otpSuccess === true ) {
      return <OtpForm loan={loan} verifyOtp={verifyOtp} />
    } else {
      return <Loan login={login} generateOtp={generateOtp} />
    }
  }
  
  render() {
    const { loan } = this.props;

    if ( loan.loan && loan.loan.message === "Success" ) {
      return <Redirect to="/menu" />
    }

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
    agent: state.agent,
    users: state.users
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    generateOtp: ( data ) => dispatch( generateOtp( data ) ),
    verifyOtp: ( data ) => dispatch( verifyOtp( data ) ),
    getUser: () => dispatch(getUser())
  }

  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Container );
