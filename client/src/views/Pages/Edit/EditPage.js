import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import EditForm from './EditForm';
import { onEdit } from "../../../store/actions/action_edit";
import { isAuthenticated } from "../../../helper/authenticate";
import Ravepay from '../../Payment/Ravepay';

class EditPage extends Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    refererPhone: "",
    state: "",
    city: "",
    street: "",

  }

  handleChange = ( e, name ) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
    console.log( this.state );
  }

  onEdit = async ( e ) => {
    e.preventDefault();
    const { onEdit } = this.props;
    const { firstName, lastName, phone, refererPhone, city, state, street } = this.state;
    const data = {
      firstName, lastName, phone, refererPhone, city, state, street
    }

    try {
      await onEdit(data)
    } catch ( err ) { }
    this.setState( {
      
    })
  }

  render() {
    const { firstName, lastName, phone, refererPhone, city, state, street } = this.state;
    const { edit } = this.props;
    const payed = isAuthenticated().user.payed;
    const email = isAuthenticated().user.email;
    const userPhone = isAuthenticated().user.phone;
    const pubKey = "FLWPUBK_TEST-5873159f7e4700f2fd468cc2527ea6cd-X";
    if ( edit.success === true && payed === true) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div>
        <EditForm
          firstName={firstName}
          lastName={lastName}
          edit={edit}
          phone={phone}
          refererPhone={refererPhone}
          city={city}
          state={state}
          street={street}
          handleChange={this.handleChange}
          onEdit={this.onEdit}
        />
        <Row className="justify-content-md-center">
          <Col xs="12" xl="3">
            <div style={{ display: payed === true ? 'none' : "block",}}>
              <Ravepay
                email={email}
                phone={userPhone}
                amount={"1000"}
                pubKey={pubKey}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    edit: state.edit
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    onEdit: (data) => dispatch(onEdit(data))
  }
  return dispatchProps;
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
