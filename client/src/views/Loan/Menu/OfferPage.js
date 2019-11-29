import React, { Component } from "react";
import { Card, Spinner, CardBody, Button, Input, InputGroup, Form, Row, Col, Label } from "reactstrap";

class OfferPage extends Component {
  state = {
    agree: false,
    requestedAmount: ""
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

  handleRequest = async ( e ) => {
    e.preventDefault();
    const { loanRequest } = this.props;
    const { requestedAmount } = this.state;
    const data = { requestedAmount };
    try {
      await loanRequest( data );
    } catch(err) {}
  }
  render() {
    const { users, loan } = this.props;
    let message;
    const network = users.user && users.user.networks;
    const user = users.user && users.user;
    if ( network >= 1 && network < 5111 ) {
      message = <h4>You can access up to <span style={{ fontSize: "20px", color: "#ff0000"}}>NGN5,000</span> loan.</h4>
    } else if (network >= 5111 && network < 31000) {
      message = <h4>You can access up to <span style={{ fontSize: "20px", color: "#ff0000" }}>NGN100,000</span> loan.</h4>
    } else if (network >= 31000 && network < 136000){
      message = <h4>You can access up to < span style = {{ fontSize: "20px", color: "#ff0000" }
    }> NGN250,000</span > loan.</h4 > 
    } else if ( network >= 136000 ) {
      message = <h4>You can access up to < span style={{ fontSize: "20px", color: "#ff0000" }
      }> NGN250,000</span > loan.</h4 > 
    } else {
      message = <h4 style={{ fontSize: "20px", color: "#ff0000" }}>No loan is accessible to you yet. Sell more cards to qualify.</h4>
    }
    const loanCheck =
      <h4 style={{ fontSize: "20px", color: "#ff0000" }}>
        You have an outstanding loan to pay
      </h4>
    return (
      <div>
        <Card className="loanCard">
          <CardBody>
            <Row className="justify-content-center">
              <Col xs="10" xl="6">
                {user.loanPaid === false ? loanCheck : message}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="10" xl="6">
                {loan.error && loan.error.length > 0 ? <p style={{ color: "#ff0000" }}>{loan.error}</p> : null}
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
                  user.loanPaid === true && (
                    <Form onSubmit={this.handleRequest}>
                      {loan.requestSuccess === true ? <p style={{ color: "#00ff00" }}>Your loan request is successful</p> : null}
                      <InputGroup className="mb-3">
                        <Input
                          type="text"
                          placeholder="Enter amount"
                          value={this.state.requestedAmount}
                          onChange={( e ) => this.handleChange( e, "requestedAmount" )}
                        />
                      </InputGroup>
                      {loan.requestLoading === true ? <Spinner color="primary" /> : (
                        <Button disabled = {user.loanPaid === false} color="success">Make request</Button>
                      )}
                      
                    </Form>
                  )
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