import React, { Component } from 'react';
import { connect } from "react-redux";
import RegisterationForm from './Form';
import { register } from '../../../store/actions/actions_signup';
import { payIncentives } from "../../../store/actions/action_pay_incentives";
import Particles from "react-particles-js";
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

class Register extends Component {
  state = {
    email: "",
    phone: "",
    name: "",
    address: "",
    refererPhone: "",
    isRegistered: false,
  }

  componentDidMount() {
    document.title = "Registeration page"
  }
  handleChange = (e, name) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields });
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
    const pubKey = process.env.REACT_APP_PUBLIC_KEY;
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
      register,
      history
    } = this.props;

    if ( registration.success === true ) {
      window.location.href = "/dashboard";
    }

    return (
      <div className="registration">
        <Header />
        <Particles
          params={particleOpt}
          className="particles"
        />
        <div className="reg-particles">
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
            history={history}
            register={register}
          />
        </div>
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
