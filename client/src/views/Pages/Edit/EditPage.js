import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { onEdit } from "../../../store/actions/action_edit";
import { isAuthenticated } from "../../../helper/authenticate";

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
   
    const cardBought = isAuthenticated().user.cardBought;
    
    // if ( edit.success === true && cardBought === true) {
      // return <Redirect to="/dashboard" />
    // }

    return (
      <div>
        {/* <EditForm
          firstName={firstName}
          lastName={lastName}
          incentives={incentives}
          edit={edit}
          phone={phone}
          refererPhone={refererPhone}
          city={city}
          state={state}
          street={street}
          handleChange={this.handleChange}
          onEdit={this.onEdit}
        /> */}
        <Row className="justify-content-md-center">
          <Col xs="12" xl="3">
            <div style={{ display: cardBought === true ? 'none' : "block",}}>
              
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    edit: state.edit,
    incentives: state.incentives,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    onEdit: ( data ) => dispatch( onEdit( data ) ),
  }
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
