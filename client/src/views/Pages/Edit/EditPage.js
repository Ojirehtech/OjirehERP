import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import EditForm from './EditForm';
import { onEdit } from "../../../store/actions/action_edit";

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
    if ( edit.success === true ) {
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
