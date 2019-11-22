import React, { Component } from "react";
import { Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Spinner, Row, Col, Label } from "reactstrap";

class OfferPage extends Component {
  state = {
    agree: false
  }

  onChange = ( e ) => {
    const value = e.target.checked;
    this.setState( {
      agree: value
    } );
    console.log(this.state, " this is the state")
  }
  render() {
    const { users } = this.props;
    let message;
    const network = users.user && users.user.networks;
    if ( network >= 1 && network <= 5111 ) {
      message = <h4>You are qualified for <span style={{ fontSize: "20px", color: "#ff0000"}}>NGN5,000</span> money rain.</h4>
    } else if (network >= 5111) {
      message = <h4>You are qualified for <span style={{ fontSize: "20px", color: "#ff0000" }}>NGN100,000</span> money rain. Click the button below to claim you money</h4>
    } else {
      message = <h4 style={{ fontSize: "20px", color: "#ff0000"}}>You are not qualified for money rain. Sell more cards to qualify.</h4>
    }
    return (
      <div>
        <Card className="loanCard">
          <CardBody>
            <Row className="justify-content-center">
              <Col xs="10" xl="5">
                {message}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="10" xl="4">
                <p className="text-muted">Withdraw to pay back in two weeks time from your account</p>
                <InputGroup className="mb-3">
                  <Label htmlFor="check">I agree to the terms and conditions</Label>
                  <Input
                    type="checkbox"
                    id="check"
                    onChange={( e ) => this.onChange( e )}
                  />
                </InputGroup>
                <Button disabled={!this.state.agree} color="success">Withdraw</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default OfferPage;