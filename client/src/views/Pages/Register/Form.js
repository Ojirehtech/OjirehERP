import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Alert, Col, Container, Form, Spinner, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const RegisterationForm = ( {
  registration,
  onRegister,
  handleChange,
  email,
  phone,
  lastName,
  firstName,
  refererPhone,
  city,
  state,
  street
} ) => {
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
                      placeholder="First name"
                      value={firstName}
                      onChange={( e ) => handleChange( e, "firstName" )}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => handleChange(e, "lastName")}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      placeholder="Email"
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
                      type="text"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={( e ) => handleChange( e, "phone" )}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Referer phone number"
                      value={refererPhone}
                      onChange={( e ) => handleChange( e, "refererPhone" )}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={( e ) => handleChange( e, "state" )}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={( e ) => handleChange( e, "city" )}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Street"
                      value={street}
                      onChange={( e ) => handleChange( e, "street" )}
                    />
                  </InputGroup>
                  {registration.loading === true ? <Spinner color="primary" /> : (
                    <Button color="success" block>Register</Button>
                  )}
                  
                </Form>
                <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default RegisterationForm;