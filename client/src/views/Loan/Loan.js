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
import { verifyNumber, verifyOtp } from "../../store/actions/action_loan";

class Loan extends Component {
  // state = {
  //   otp: "",
  //   phone: ""
  // }
  render() {
    const user = isAuthenticated().user && isAuthenticated().user
    return (
      <div>
        <Card style={{ height: "500px" }}>
          <CardBody>
            <Row className="justify-content-md-center mt-5">
              <Col xs="12" xl="5">
                <h3>Welcome {user.name}</h3>
                <p className="text-muted">Please enter your number to see your loan offer</p>
                <Form onSubmit={"onLogin"}>
                  {/* {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null}
                  {login.error && login.error.length > 0 ? <p style={{ color: "#ff0000" }}>{login.error}</p> : null} */}
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="tel"
                      placeholder="0xxx xxx xxxx"
                      // value={otp}
                      // onChange={( e ) => handleChange( e, "otp" )}
                    />
                  </InputGroup>

                  <Row>
                    <Col xs="12">
                      {/* {login.loading === true ? <Spinner color="primary" /> : ( */}
                        <Button color="success" className="px-4">Send</Button>
                      {/* )} */}
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
  return {}
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    verifyNumber: ( data ) => dispatch( verifyNumber( data ) ),
    verifyOtp: (data) => dispatch(verifyOtp(data))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Loan);
