import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import { onLogin } from "../../../store/actions/action_login";

class Login extends Component {
  state = {
    phone: ""
  }

  handleChange = (e, name) => {
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
    console.log(this.state)
  }

  onLogin = async (e) => {
    e.preventDefault();
    const { phone } = this.state;
    const { onLogin } = this.props;
    const data = {
      phone,
    }
    try {
      await onLogin(data)
    } catch(err) {}
  }
  render() {
    const { login } = this.props;
    const { phone } = this.state;

    if (login.success === true) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div style={{ marginTop: "100px",}}>
        <LoginForm
          phone={phone}
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
