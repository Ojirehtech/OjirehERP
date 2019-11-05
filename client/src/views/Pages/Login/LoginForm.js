import React from 'react';
import { Link } from 'react-router-dom';
import {Alert, Button, Card, CardBody, CardGroup, Spinner, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


const LoginForm = ({ login, email, password, handleChange, onLogin}) =>{
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={onLogin}>
                    <h1>Login</h1>
                    {login.error && login.error.length > 0 ? <Alert color="danger">{login.error}</Alert> : null}
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => handleChange(e, "email")}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => handleChange(e, "password")}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        {login.loading === true ? <Spinner color="primary" /> : (
                          <Button color="primary" className="px-4">Login</Button>
                        )}
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Make Payment</h2>
                    <p>You don't have an account with us yet? Click on the register button to register and start enjoying our awesome services and incentives</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default LoginForm;
