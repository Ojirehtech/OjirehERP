import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
  Card,
  Row,
  CardBody
} from "reactstrap";
import Header from "../Pages/Header/Header";
import Particles from "react-particles-js";
import { dataUpload } from "../../store/actions/actions_signup";
import { isAuthenticated } from "../../helper/authenticate";

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

class Container extends Component{
  state = {
    userData: [{
      name: "",
      email: "",
      phone: "",
      address: ""
    }]
  }

  onDataChange = index => event => {
    const newUserData = [ ...this.state.userData ];
    newUserData[ index ][ event.target.name ] = event.target.value;
    this.setState( {
      userData: newUserData
    } );
    console.log(this.state.userData)
  }

  addNewData = () => {
    const newData = [ ...this.state.userData ];
    newData.push( { name: "", email: "", phone: "", address: "" } );
    this.setState( state => ( { ...state, userData: newData } ) );
  }

  handleSubmit = async () => {
    const data = this.state.userData;
    const { dataUpload } = this.props;
    try {
      await dataUpload( data );
      await this.setState( {
        name: "",
        email: "",
        phone: "",
        address: ""
      } );
    } catch ( err ) { }

    
  }

  render() {
    const { registration } = this.props;
    console.log( registration, " this is registration" );
    const userRole = isAuthenticated().user && isAuthenticated().user.role;
    if ( userRole !== "support" ) {
      return <Redirect to="/" />
    }
    return (
      <div className="flex-row align-items-center">
        <Header />
        <Particles
          params={particleOpt}
          className="particles"
        />
        <div className="reg-particles">
          <Row className="justify-content-md-center">
            <Col md="9" lg="7" xl="6">
              <Card>
                <h3 className="ml-4 mt-5" style={{ color: "#4dbd74" }}>Upload user data</h3>
                {registration.dataSuccess === true ? <p className="ml-4" style={{ color: "#00ff00" }}>Data uploaded successfully</p> : null}
                {registration.error && registration.error.length > 0 ? <p style={{ color: "#00ff00" }}>{registration.error}</p> : null}
                <CardBody>
                  {this.state.userData.map( ( userData, index ) => (
                    <div className="" key={index + 1}>
                      <Col xs="12" xl="12">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Name"
                            value={userData.name}
                            name="name"
                            onChange={this.onDataChange(index)}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="12" xl="12">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-envelope"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Enter your email"
                            value={userData.email}
                            name="email"
                            onChange={this.onDataChange( index )}
                          />
                        </InputGroup>
                      </Col>
                      
                      <Col xs="12" xl="12">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Phone"
                            value={userData.phone}
                            name="phone"
                            onChange={this.onDataChange( index )}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="12" xl="12">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-home"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Enter your address"
                            value={userData.address}
                            name="address"
                            onChange={this.onDataChange( index )}
                          />
                        </InputGroup>
                      </Col>
                    </div>
                  ) )}
                  <Row className="justify-content-center">
                    <Col xs="12" xl="10">
                      <Row>
                        <div className="m-2">
                          {registration.dataLoading === true ? <Spinner color="primary" /> : (
                            <Button color="primary" onClick={this.handleSubmit}>
                              Upload
                            </Button>
                          )}
                        </div>
                        <div className="m-2">
                          <Button
                            color="primary"
                            className="float-left"
                            outline
                            onClick={() => this.addNewData()}
                          >
                            ADD ANOTHER ROUND
                          </Button>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registration: state.register
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    dataUpload: (data) => dispatch(dataUpload(data))
  }

  return dispatchProps;
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);