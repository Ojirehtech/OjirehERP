import React from 'react';
import { Alert, Button, Card, CardBody, CardGroup, Spinner, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


const OtpLogin = ( { login, phone, handleChange, onSubmitOtp } ) => {
  return (
    <div className="mt-5">
      <Row className="justify-content-md-center mt-5">
        <Col md="4" className="mt-5">
          <CardGroup>
            <Card>
              <CardBody>
                <Form onSubmit={onSubmitOtp}>
                  <h3>Verify your phone number</h3>
                  {/* {login.error && login.error.length > 0 ? <Alert color="danger">{login.error}</Alert> : null} */}
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
                        <Button color="primary" className="px-4">Verify your phone number</Button>
                      )}
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
