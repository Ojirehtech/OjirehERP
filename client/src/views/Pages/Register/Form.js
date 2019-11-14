import React from "react";
import { Link } from "react-router-dom";
import {
  // Button,
  Card,
  CardBody,
  Alert,
  Col,
  Container,
  Form,
  // Spinner,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import Ravepay from "../../Payment/Ravepay";

const RegisterationForm = ( {
  registration,
  onRegister,
  handleChange,
  email,
  phone,
  name,
  address,
  refererPhone,
  payIncentives,
  incentives,
  pubKey,
  history,
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
                      placeholder="Your name"
                      value={name}
                      onChange={( e ) => handleChange( e, "name" )}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-envelope-closed"></i>
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
                        <i className="icon-home"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={( e ) => handleChange( e, "address" )}
                    />
                  </InputGroup>
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
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Referer phone number"
                      value={refererPhone}
                      onChange={( e ) => handleChange( e, "refererPhone" )}
                    />
                  </InputGroup>
                </Form>
                <Ravepay
                  email={email}
                  phone={phone}
                  amount={"1000"}
                  refererPhone={refererPhone}
                  pubKey={pubKey}
                  payIncentives={payIncentives}
                  incentives={incentives}
                  onRegister={onRegister}
                  history={history}
                />
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