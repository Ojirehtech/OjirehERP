import React, { Component } from "react";
import { Card, CardBody, Button, Input, InputGroup, Form, Spinner, Row, Col, Label } from "reactstrap";

class OfferPage extends Component {
  state = {
    agree: false,
    amount: ""
  }

  onChange = ( e ) => {
    const value = e.target.checked;
    this.setState( {
      agree: value
    } );
  }

  handleChange = (e, name) => {
    let field = this.state;
    field[ name ] = e.target.value;
    this.setState( { field } );
    console.log(this.state.amount)
  }

  handleRequest = ( e ) => {
    e.preventDefault();
    
  }
  render() {
    const { users } = this.props;
    let message;
    const network = users.user && users.user.networks;
    if ( network >= 1 && network <= 5111 ) {
      message = <h4>You can access up to<span style={{ fontSize: "20px", color: "#ff0000"}}>NGN5,000</span> loan.</h4>
    } else if (network >= 5111) {
      message = <h4>You can access up to<span style={{ fontSize: "20px", color: "#ff0000" }}>NGN100,000</span> loan.</h4>
    } else {
      message = <h4 style={{ fontSize: "20px", color: "#ff0000"}}>No loan is accessible to you yet. Sell more cards to qualify.</h4>
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
                  <Label htmlFor="check">Click to request loan</Label>
                  <Input
                    type="checkbox"
                    id="check"
                    onChange={( e ) => this.onChange( e )}
                  />
                </InputGroup>
                {this.state.agree === true ? (
                  <Form onSubmit={this.handleRequest}>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={this.state.amount}
                        onChange={(e) => this.handleChange(e, "amount")}
                      />
                    </InputGroup>
                    <Button color="success">Make request</Button>
                  </Form>
                ) : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default OfferPage;