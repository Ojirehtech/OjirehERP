import React from "react";
import { 
  Row, 
  Button, 
  Col, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Spinner, 
  Card, 
  CardGroup, 
  CardBody 
} from "reactstrap";

const CobrandForm = ({ 
  registration, 
  handleChange, 
  handleSubmit,
  name,
  brand,
  brandlist,
  email,
  phone,
  address,
}) => {
  return (
    <div>
      <Col xs="12" sm="10" xl="12">
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => handleChange(e, "name")}
          />
        </InputGroup>
      </Col>
      <Col xs="12" sm="10" xl="12">
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-envelope"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleChange(e, "email")}
          />
        </InputGroup>
      </Col>
      <Col xs="12" sm="10" xl="12">
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-phone"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            placeholder="Your Phone"
            value={phone}
            onChange={(e) => handleChange(e, "phone")}
          />
        </InputGroup>
      </Col>
      <Col xs="12" sm="10" xl="12">
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-home"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => handleChange(e, "address")}
          />
        </InputGroup>
      </Col>
      <Col xs="12" sm="10" xl="12">
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-home"></i>
            </InputGroupText>
          </InputGroupAddon>
          <select
            onChange={(e) => handleSelect(e, "address)}
          >
            <option value=""></option>
          </select>
        </InputGroup>
      </Col>
      <Col xs="12" sm="10" xl="12">
        {registration.loading === true ? <Spinner color="primary" /> : (
          <Button
            onClick={() => handleSubmit()}
            style={{ paddingLeft: 20, paddingRight: 20 }} color="success">Send</Button>
        )}
      </Col>
    </div>
  )
}

export default CobrandForm;