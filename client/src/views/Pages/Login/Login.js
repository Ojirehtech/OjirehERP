import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginForm from './LoginForm';
import { onLogin, sendOTP } from "../../../store/actions/action_login";
import Particles from "react-particles-js";
import OtpLogin from './OtpLogin';
import Header from '../Header/Header';

const particleOpt = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1500
      }
    }
  }
}

class Login extends Component {
  state = {
    phone: "",
    isOtpSuccess: false,
    errMsg: "",
  }

  componentDidMount() {
    document.title = "Login page";
  }

  componentDidUpdate(prevProps, nextProps) {
    if ( this.props.login !== prevProps.login ) {
      if ( this.props.login.otpSuccess === true ) {
        this.setState( { isOtpSuccess: true } );        
      }
    }
  }

  handleChange = (e, name) => {
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  onLogin = async ( e ) => {
    e.preventDefault();
    const { otp } = this.state;
    const { onLogin } = this.props;
    const data = {
      otp,
    }
    try {
      if ( !otp ) {
        this.setState( {
          errMsg: "Please enter the otp code"
        } )
        return;
      }
      await onLogin( data );
    } catch ( err ) { }
  }

  onSubmitOtp = async ( e ) => {
    e.preventDefault();
    const { phone } = this.state;
    const { sendOTP } = this.props;
    try {
      if ( !phone || phone.length < 11 ) {
        this.setState( {
          errMsg: "Enter a valid phone number"
        } );
        return;
      }
      await sendOTP( phone );
    } catch ( err ) { }
  }
  
  toggelState = () => {
    this.setState( { isOtpSuccess: !this.state.isOtpSuccess })
  }

  renderView = () => {
    const { isOtpSuccess, phone, otp, errMsg } = this.state;
    const { login,  } = this.props;
    if ( isOtpSuccess === true ) {
      return (
        <LoginForm
          phone={otp}
          errMsg={errMsg}
          login={login}
          handleChange={this.handleChange}
          onLogin={this.onLogin}
          toggelState={this.toggelState}
        />
      )
    } else {
      return (
        <OtpLogin
          errMsg={errMsg}
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
      return window.location.href = "/";
    }

    return (
      <div>
        <Header />
        <Particles
          params={particleOpt}
          style={{ background: "linear-gradient(to right, #0a7e07 0%, #0a7e07 100%)"}}
        />
        <div className="particle-page">
          {this.renderView()}
        </div>
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
