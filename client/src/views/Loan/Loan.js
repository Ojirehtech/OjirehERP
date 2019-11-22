import React, { Component } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Spinner,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Form,
} from "reactstrap";
import { isAuthenticated } from "../../helper/authenticate";

class Loan extends Component {
  state = {
    otp: "",
    phone: "",
    otpSuccess: false,
  }

  onChange = ( e, name ) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
  }

  handleVerification = async (e, name) => {
    e.preventDefault();
    const { phone } = this.state;
    const { generateOtp } = this.props;
    
    try {
     
      await generateOtp( phone );
    } catch(err) {}
  }

  render() {
    const { login } = this.props;
    const { phone } = this.state;
    const user = isAuthenticated().user && isAuthenticated().user;
    return (
      <div>
        <Card style={{ height: "500px" }}>
          <CardBody>
            <Row className="justify-content-md-center mt-5">
              <Col xs="12" xl="5">
                <h3>Welcome {user.name}</h3>
                <p className="text-muted">Please enter your number to see your loan offer</p>
                <Form onSubmit={(e) => this.handleVerification(e, "phone")}>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="tel"
                      placeholder="0xxx xxx xxxx"
                      value={phone}
                      onChange={( e ) => this.onChange( e, "phone" )}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="12">
                      {login.loading === true ? <Spinner color="primary" /> : (
                        <Button color="success" className="px-4">Send</Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}


export default Loan;
