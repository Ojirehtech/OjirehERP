import React, { Component } from "react";
import Particles from "react-particles-js";
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
import Header from "../Pages/Header/Header";

const particleOpt = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1500
      }
    }
  }
}

export default class Cobrand extends Component{
  state = {
    name: "",
    photo: "",
    email: "",
    phone: "",
    address: "",
    isPhoto: false,
    errMessage: "",
  }

  handleChange = (e, name) => {
    let field = this.state;
    if (name === "photo") {
      this.setState({
        photo: e.target.files[0],
        isPhoto: true,
      });
    }

    field[name] = e.target.value;
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  handleUpload = () => {

  }

  render() {
    const { name, email, phone, address } = this.state;
    return(
      <div>
        <Header />
        <Particles
          params={particleOpt}
          style={{ background: "linear-gradient(to right, #0a7e07 0%, #0a7e07 100%)"}}
        />
        <Row className="justify-content-center">
          <Col xs="10" xl="6">
            <CardGroup className="reg-particle">
              <Card>
                <h4 className="text-center" style={{ marginTop: 30 }}>Upload your information</h4>
                <p style={{ paddingLeft: 30, color: "green" }}>You must upload your photo first before you can continue</p>
                <CardBody>
                  <Col xs="12" sm="10" xl="12">
                    <InputGroup className="mb-3">
                      <div className="custom-file">
                        <input 
                          type="file" 
                          className="custom-file-input" 
                          id="customFile"
                          onChange={(e) => this.handleChange(e, "photo")}
                          accept="image/*"
                        />
                        <label className="custom-file-label" for="customFile">Choose file</label>
                      </div>
                    </InputGroup>
                    { this.state.isPhoto === true ? 
                    ( <>
                      <p style={{ background: "lightgreen", padding: 5 }}>{this.state.photo.name}</p>
                      <Button color="success" style={{ marginBottom: 10 }}>Upload photo</Button>
                      </>
                      ) : null
                    }
                  </Col>
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
                        onChange={(e) => this.handleChange(e, "name")}
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
                        onChange={(e) => this.handleChange(e, "email")}
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
                        onChange={(e) => this.handleChange(e, "phone")}
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
                        onChange={(e) => this.handleChange(e, "address")}
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="12" sm="10" xl="12">
                    <Button style={{ paddingLeft: 20, paddingRight: 20 }} color="success">Send</Button>
                  </Col>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  }
}