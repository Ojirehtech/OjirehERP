import React from "react";
import { Button, Card, CardBody, Alert, Col, Container, Form, Spinner, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const RegisterationForm = ( { registration, onRegister, handleChange, email, username, password}) => {
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={onRegister}>
                  <h1>Register</h1>
                  {registration.error && registration.error.length > 0 ? <Alert color="danger">{registration.error}</Alert> : null}
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => handleChange(e, "email")}
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
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </InputGroup>
                  {registration.loading === true ? <Spinner color="primary" /> : (
                    <Button color="success" block>Register</Button>
                  )}
                  
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default RegisterationForm;