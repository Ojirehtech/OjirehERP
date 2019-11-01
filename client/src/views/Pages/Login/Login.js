import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginForm from './LoginForm';

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
    return (
      <div className="app flex-row align-items-center">
        <LoginForm />
      </div>
    );
  }
}

export default Login;
