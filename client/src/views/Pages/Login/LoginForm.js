import React from 'react';
import {Alert, Button, Card, CardBody, CardGroup, Spinner, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


const LoginForm = ({ login, phone, handleChange, onLogin}) =>{
  return (
    <div className="mt-5">
      <Row className="justify-content-md-center mt-5">
        <Col md="4" className="mt-5">
          <CardGroup>
            <Card>
              <CardBody>
                <Form onSubmit={onLogin}>
                  <h1>Verify phone</h1>
                  {login.error && login.error.length > 0 ? <Alert color="danger">{login.error}</Alert> : null}
                  {/* <p className="text-muted">Sign In to your account</p> */}
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => handleChange(e, "phone")}
                    />
                  </InputGroup>
                
                  <Row>
                    <Col xs="12">
                      {login.loading === true ? <Spinner color="primary" /> : (
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


export default LoginForm;
