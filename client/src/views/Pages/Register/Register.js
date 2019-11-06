import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import RegisterationForm from './Form';
import { register } from '../../../store/actions/actions_signup';
import { payIncentives } from "../../../store/actions/action_pay_incentives";
import Ravepay from '../../Payment/Ravepay';


class Register extends Component {
  state = {
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    refererPhone: "",
    isRegistered: false,
  }

  componentDidUpdate(prevProps, nextProps) {
    
    if ( this.props.registration !== prevProps.registration ) {
      console.log( this.props.registration, " Before second check" )
      if ( this.props.registration && this.props.registration.success === true ) {
        console.log( this.props.registration, "This is a console message")
        this.toggleRegistered();
      }
    }
  }
  onRegister = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, street, city, state, refererPhone } = this.state;
    const { register } = this.props;
    const data = {
      email,
      phone,
      street,
      firstName,
      lastName,
      city,
      state,
      refererPhone
    }
    try {
      await register( data );
    } catch(err) {}
  }

  handleChange = (e, name) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
  }

  toggleRegistered = () => {
    this.setState( ( prevState ) => {
      return {
        isRegistered: !prevState.isRegistered
      }
    } );
  }

  renderView = () => {
    const pubKey = "FLWPUBK_TEST-5873159f7e4700f2fd468cc2527ea6cd-X";
    const { email,
      phone,
      street,
      firstName,
      lastName,
      city,
      state,
      refererPhone,
      isRegistered,
    } = this.state;
    const { payIncentives, registration } = this.props;
    if ( isRegistered === true) {
      return (
        <Ravepay
          email={email}
          phone={phone}
          amount={"1000"}
          pubKey={pubKey}
          payIncentives={payIncentives}
        />
      );
    } else {
      return (
        <RegisterationForm
          email={email}
          phone={phone}
          street={street}
          city={city}
          state={state}
          firstName={firstName}
          lastName={lastName}
          refererPhone={refererPhone}
          registration={registration}
          handleChange={this.handleChange}
          onRegister={this.onRegister}
        />
      )
    }
  }

  render() {
    // const {
    //   email,
    //   phone,
    //   street,
    //   city,
    //   state,
    //   refererPhone,
    //   firstName,
    //   lastName
    // } = this.state;
    const { registration } = this.props;
    if ( registration.success === true ) {
      // return <Redirect to="/login" />
    }
    return (
      <div>
        {this.renderView()}
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
    register: ( data ) => dispatch( register( data ) ),
    payIncentives: () => dispatch(payIncentives()),
  }

  return dispatchProps;
}
export default connect( mapStateToProps, mapDispatchToprops)(Register);
