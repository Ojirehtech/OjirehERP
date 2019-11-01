import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import { onLogin } from "../../../store/actions/action_login";
import { isAuthenticated } from "../../../helper/authenticate";

class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = (e, name) => {
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
    console.log(this.state)
  }

  onLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    const data = {
      email,
      password
    }
    try {
      await onLogin(data)
    } catch(err) {}
  }
  render() {
    const { login } = this.props;
    const { email, password } = this.state;
    const profileUpdated = isAuthenticated().user ? isAuthenticated().user.profileUpdated : null;

    if ( profileUpdated === true && login.success === true) {
      return <Redirect to="/dashboard" />
    }
          
    if ( profileUpdated === false) {
      return <Redirect to="/editProfile" />
    }

    return (
      <div className="app flex-row align-items-center">
        <LoginForm
          email={email}
          password={password}
          login={login}
          handleChange={this.handleChange}
          onLogin={this.onLogin}
        />
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
    onLogin: (data) => dispatch(onLogin(data))
  }
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
