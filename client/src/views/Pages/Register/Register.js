import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import RegisterationForm from './Form';
import { register } from '../../../store/actions/actions_signup';


class Register extends Component {
  state = {
    email: "",
    password: "",
    username: "",
  }

  onRegister = async (e) => {
    e.preventDefault();
    const { email, password, username } = this.state;
    const { register } = this.props;
    console.log( "you attempted submit" );
    const data = {
      email,
      password,
      username
    }
    try {
      await register(data)
    } catch(err) {}
  }

  handleChange = (e, name) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
  }

  render() {
    const { email, username, password } = this.state;
    const { registration } = this.props;
    if ( registration.success === true ) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <RegisterationForm
          email={email}
          password={password}
          username={username}
          registration={registration}
          handleChange={this.handleChange}
          onRegister={this.onRegister}
        />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    registration: state.register
  }
}

const mapDispatchToprops = ( dispatch ) => {
  const dispatchProps = {
    register: (data) => dispatch(register(data))
  }

  return dispatchProps;
}
export default connect( mapStateToProps, mapDispatchToprops)(Register);
