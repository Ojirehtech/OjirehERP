import React from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';


const EditForm = ( {
  firstName,
  lastName, phone,
  refererPhone, city,
  state, street, onEdit,
  handleChange,
  edit
} ) => {
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={onEdit}>
                    <h1>Edit profile</h1>
                    {edit.error && edit.error.length > 0 ? <Alert color="danger">{edit.error}</Alert> : null}
                    <p className="text-muted">Edit your account to continue</p>
                    <Row>
                      <Col xs="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="First name"
                            autoComplete="username"
                            value={firstName}
                            onChange={(e) => handleChange(e, "firstName")}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="6" className="text-right">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => handleChange(e, "lastName")}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Referer phone"
                            value={refererPhone}
                            onChange={(e) => handleChange(e, "refererPhone")}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="6" className="text-right">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Your phone number"
                            value={phone}
                            onChange={(e) => handleChange(e, "phone")}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-home"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => handleChange(e, "state")}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="6" className="text-right">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-home"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => handleChange(e, "city")}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-home"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Street"
                            value={street}
                            onChange={(e) => handleChange(e, "street")}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        {edit.loading === true ? <Spinner color="primary" /> : (
                          <Button color="primary" className="px-4">Edit</Button>
                        )}
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
             
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default EditForm;
