import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Particles from "react-particles-js";
import Header from '../Header/Header';
import {
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
  Spinner,
  Card,
  CardBody,
  CardGroup,
  Button
} from "reactstrap";
import { adminSignup } from '../../../store/actions/action_admin';
import { Link } from 'react-router-dom';

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

class AdminSignup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errMsg: ""
  }

  componentDidMount() {
    document.title = "Admin Signup";
  }

  
  handleChange = ( e, name ) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
  }

  
  onSubmit = async ( e ) => {
    e.preventDefault();
    const { adminSignup } = this.props;
    const { name, email, password } = this.state;
    const data = { name, email, password };
    try {
      await adminSignup( data );
    } catch ( err ) { }
  }

  render() {
    const { admin } = this.props;
    const { errMsg, name, email, password } = this.state;

    if ( admin.success === true ) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <Header />
        <Particles
          params={particleOpt}
          style={{ background: "linear-gradient(to right, #0a7e07 0%, #0a7e07 100%)" }}
        />
        <div className="particle-page">
          <div>
            <Row className="justify-content-md-center mt-5">
              <Col md="4" className="mt-5">
                <CardGroup>
                  <Card>
                    <CardBody>
                      <p className="text-center">Admin account</p>
                      <Form onSubmit={this.onSubmit}>
                        {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null}
                        {admin.error && admin.error.length > 0 ? <p style={{ color: "#ff0000" }}>{admin.error}</p> : null}
                        <p className="text-muted">Signup as an admin</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={( e ) => this.handleChange( e, "name" )}
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-envelope"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={( e ) => this.handleChange( e, "email" )}
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={( e ) => this.handleChange( e, "password" )}
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="12">
                            {admin.loading === true ? <Spinner color="primary" /> : (
                              <Button
                                className="px-4"
                                style={{
                                  background: "linear-gradient(to right, #0a7e07 0%, #0a7e07 100%)",
                                  color: "#fff"
                                }}
                              >Send</Button>
                            )}
                          </Col>
                        </Row>
                      </Form>
                      <p>Already have an account ? <Link to="/signin">Login</Link></p>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    admin: state.admin
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    adminSignup: ( data ) => dispatch( adminSignup( data ) ),
  }
  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( AdminSignup );
