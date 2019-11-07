import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import { onLogin, sendOTP } from "../../../store/actions/action_login";
import OtpLogin from './OtpLogin';

class Login extends Component {
  state = {
    phone: "",
    isOtpSuccess: false,
  }

  componentDidUpdate(prevProps, nextProps) {
    if ( this.props.login !== prevProps.login ) {
      // if ( this.props.login.otpSuccess === true ) {
        this.setState( { isOtpSuccess: true } );        
      // }
    }
  }

  handleChange = (e, name) => {
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
    console.log(this.state)
  }

  onLogin = async (e) => {
    e.preventDefault();
    const { otp } = this.state;
    const { onLogin } = this.props;
    const data = {
      otp,
    }
    try {
      await onLogin(data)
    } catch(err) {}
  }

  onSubmitOtp = async ( e ) => {
    e.preventDefault();
    const { phone } = this.state;
    const { sendOTP } = this.props;
    console.log(sendOTP, "you just clicked")
    try {
      await sendOTP( phone );
      console.log("after send otp")
    } catch(err) {}
  }

  renderView = () => {
    const { phone, otp } = this.state;
    const { login,  } = this.props;
    if ( login.otpSuccess === true ) {
      return (
        <LoginForm
          phone={otp}
          login={login}
          handleChange={this.handleChange}
          onLogin={this.onLogin}
        />
      )
    } else {
      return (
        <OtpLogin
          phone={phone}
          login={login}
          handleChange={this.handleChange}
          onSubmitOtp={this.onSubmitOtp}
        />
      )
    }
  }
  render() {
    const { login } = this.props;

    if (login.success === true) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div style={{ marginTop: "100px",}}>
        {this.renderView()}
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    onLogin: ( data ) => dispatch( onLogin( data ) ),
    sendOTP: (data) => dispatch(sendOTP(data))
  }
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
