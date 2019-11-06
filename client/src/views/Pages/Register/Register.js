import React, { Component } from 'react';
import { connect } from "react-redux";
import RegisterationForm from './Form';
import { register } from '../../../store/actions/actions_signup';
import { payIncentives } from "../../../store/actions/action_pay_incentives";

class Register extends Component {
  state = {
    email: "",
    phone: "",
    name: "",
    address: "",
    refererPhone: "",
    isRegistered: false,
  }

  handleChange = (e, name) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields }, this.onRegister);
  }

  onRegister = async () => {
    const { name, address, email, phone, refererPhone } = this.state;
    const { register } = this.props;
    const data = {
      email,
      phone,
      name,
      address,
      refererPhone
    }
    if ( !name || !email || !phone || !refererPhone || !address || refererPhone.length < 11) {
      return;
    } else {
      try {
        await register( data );
      } catch ( err ) { }
    }
  }

  render() {
    const pubKey = "FLWPUBK_TEST-5873159f7e4700f2fd468cc2527ea6cd-X";
    const {
      email,
      phone,
      name,
      address,
      refererPhone,
    } = this.state;
    const {
      payIncentives,
      registration,
      incentives,
    } = this.props;
    return (
      <div>
        <RegisterationForm
          email={email}
          phone={phone}
          address={address}
          name={name}
          refererPhone={refererPhone}
          registration={registration}
          handleChange={this.handleChange}
          onRegister={this.onRegister}
          payIncentives={payIncentives}
          incentives={incentives}
          pubKey={pubKey}
        />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    registration: state.register,
    incentives: state.incentives
  }
}

const mapDispatchToprops = ( dispatch ) => {
  const dispatchProps = {
    register: ( data ) => dispatch( register( data ) ),
    payIncentives: ( refererPhone ) => dispatch( payIncentives( refererPhone)),
  }

  return dispatchProps;
}
export default connect( mapStateToProps, mapDispatchToprops)(Register);
