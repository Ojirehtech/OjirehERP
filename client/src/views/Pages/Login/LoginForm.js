import React from 'react';
import {Alert, Button, Card, CardBody, CardGroup, Spinner, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


const LoginForm = ( { errMsg, toggelState, login, otp, handleChange, onLogin}) =>{
  return (
    <div className="mt-5">
      <Row className="justify-content-md-center mt-5">
        <Col md="4" className="mt-5">
          <CardGroup>
            <Card>
              <CardBody>
                <Form onSubmit={onLogin}>
                  <h3>Code verification</h3>
                  {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null}
                  {login.error && login.error.length > 0 ? <p style={{ color: "#ff0000" }}>{login.error}</p> : null}
                  <p className="text-muted">Enter the code sent to your phone here</p>
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
                        <Button color="primary" className="px-4">Send</Button>
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
