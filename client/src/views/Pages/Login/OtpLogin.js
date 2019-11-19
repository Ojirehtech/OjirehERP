import React from 'react';
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardGroup, Spinner, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import logo from "../../../assets/img/brand/ojirehprime_logo.png";


const OtpLogin = ( { login, phone, handleChange, onSubmitOtp } ) => {
  return (
    <div className="mt-5">
      <Row className="justify-content-md-center mt-5">
        <Col md="4" className="mt-5">
          <CardGroup>
            <Card>
              <CardBody>
                <Row className="justify-content-md-center m-4">
                  <img src={logo} alt="logo" />
                </Row>
                <Form onSubmit={onSubmitOtp}>
                  <h3 style={{ color: "#4dbd74"}}>Verify your phone number</h3>
                  {login.error && login.error.length > 0 ? <p color="danger">{login.error}</p> : null}
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={( e ) => handleChange( e, "phone" )}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="12">
                      {login.otpLoading === true ? <Spinner color="primary" /> : (
                        <Button color="success" className="px-4">Verify your phone number</Button>
                      )}
                    </Col>
                  </Row>
                  
                  <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
                  <Row>
                    <Col xs="12">
                      <p>If you are not receiving your OTP, please try removing your number from your network's DND list by texting “ALLOW” to 2442.</p>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}


export default OtpLogin;
