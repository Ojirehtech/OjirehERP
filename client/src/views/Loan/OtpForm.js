import React, { Component } from "react";
import { connect } from "react-redux";
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

class OtpForm extends Component {
  state = {
    otp: "",
    otpSuccess: false,
  }

  onChange = ( e, name ) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
    console.log( this.state );
  }

  handleVerification = async ( e, name ) => {
    e.preventDefault();
    const {  otp } = this.state;
    const { verifyOtp } = this.props;

    try {
      if ( name === "phone" ) {
        await verifyOtp( otp );
      } else {
      }
    } catch ( err ) { }
  }

  render() {
    const { loan } = this.props;
    const { otp } = this.state;
    const user = isAuthenticated().user && isAuthenticated().user;
    return (
      <div>
        <Card style={{ height: "500px" }}>
          <CardBody>
            <Row className="justify-content-md-center mt-5">
              <Col xs="12" xl="5">
                <h3>Welcome {user.name}</h3>
                <p className="text-muted">Kindly enter the OTP code sent to your phone</p>
                <Form onSubmit={( e ) => this.handleVerification( e, "phone" )}>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="tel"
                      placeholder="0xxx xxx xxxx"
                      value={otp}
                      onChange={( e ) => this.onChange( e, "otp" )}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="12">
                      {loan.loading === true ? <Spinner color="primary" /> : (
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


export default OtpForm;
