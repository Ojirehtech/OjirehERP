import React from 'react';
import { Button, Card, CardBody, CardGroup, Spinner, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const LoginForm = ( { errMsg, toggelState, login, otp, handleChange, onLogin}) =>{
  return (
    <div className="mt-5">
      <Row className="justify-content-md-center mt-5">
        <Col md="4" className="mt-5">
          <CardGroup>
            <Card>
              <CardBody>
                <p className="text-center">We sent a verification code to your phone number</p>
                <Form onSubmit={onLogin}>
                  {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null}
                  {login.error && login.error.length > 0 ? <p style={{ color: "#ff0000" }}>{login.error}</p> : null}
                  <p className="text-muted">Kindly enter the code here</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={otp}
                      onChange={(e) => handleChange(e, "otp")}
                    />
                  </InputGroup>
                
                  <Row>
                    <Col xs="12">
                      {login.loading === true ? <Spinner color="primary" /> : (
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
                <p>Click <span
                    onClick={() => toggelState()}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                    }}
                >here</span> to resend code</p>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}


export default LoginForm;
