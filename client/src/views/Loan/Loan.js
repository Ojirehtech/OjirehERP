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
import { verifyOtp } from "../../store/actions/action_loan";
import { sendOTP } from "../../store/actions/action_login";

class Loan extends Component {
  state = {
    otp: "",
    phone: ""
  }

  onChange = ( e, name ) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
    console.log( this.state );
  }

  handleVerification = async (e, name) => {
    e.preventDefault();
    const { phone, otp } = this.state;
    const { sendOTP, verifyOtp } = this.props;
    
    try {
      if ( name === "phone" ) {
        await sendOTP( phone );
      } else {
        await verifyOtp( otp );
      }
    } catch(err) {}
  }

  render() {
    const { loan } = this.props;
    const { phone } = this.state;
    const user = isAuthenticated().user && isAuthenticated().user
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

const mapStateToProps = ( state ) => {
  return {
    loan: state.loan,
    login: state.login
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    sendOTP: ( data ) => dispatch( sendOTP(data) ),
    verifyOtp: (data) => dispatch(verifyOtp(data))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Loan);
