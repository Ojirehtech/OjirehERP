import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import { onLogin, sendOTP } from "../../../store/actions/action_login";
import Particles from "react-particles-js";
import OtpLogin from './OtpLogin';

const particleOpt = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500
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

  onLogin = async (e) => {
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
        })
        return;
      }
      await onLogin( data );
    } catch(err) {}
  }

  onSubmitOtp = async ( e ) => {
    e.preventDefault();
    const { phone } = this.state;
    const { sendOTP } = this.props;
    try {
      if ( !phone ) {
        this.setState( {
          errMsg: ""
        })
      }
      await sendOTP( phone );
    } catch(err) {}
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
      return <Redirect to="/" />
    }

    return (
      <div>
        <Particles
          params={particleOpt}
          className="particles"
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
