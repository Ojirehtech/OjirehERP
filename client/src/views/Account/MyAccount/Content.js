import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
  CardGroup
} from 'reactstrap';
import DataTab from "./Tab";

class Content extends Component {
  state = {
    showStatement: false,
  }

  toggleState = () => {
    this.setState( ( prevState ) => {
      return {
        showStatement: !prevState.showStatement
      }
    } );
  }

  displayStatement = () => {
    const { transaction, transfer } = this.props;
    const request = transaction.requests && transaction.requests;
    const transferRequest = transfer.transfer && transfer.transfer;
    
    const { showStatement } = this.state;
    if ( showStatement ) {
      return (
        <DataTab
          transaction={transaction}
          request={request}
          transfer={transferRequest}
        />
      )
    }
  }
  
  render() {
    const { showStatement } = this.state;
    const { users, onRequestClick, onChange, transaction, cardNo, amount, message } = this.props;
    const user = users.user ? users.user : null;
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="4">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <h3 className="mb-3">Available Balance</h3>
                <h2 className="mb-3">
                  <strong>
                    &#8358;{new Date().getDate() < 18 ? 5000 + ".00" : ( user.balance && user.balance ) + ".00"}
                  </strong>
                </h2>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="12" xl="5">
            {transaction.withdrawSuccess === true ? <p style={{ color: "#00ff00" }}>Your request has been recieved and will be processed within 3 hours</p> : null}
            {message.length > 0 ? <p style={{ color: "#ff0000" }}>{message}</p> : null}
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-5">
          <Col xs="12" xl="4" >
            <CardGroup>
              <Card>
                <CardBody>
                  <Form onSubmit={onRequestClick}>
                    <h3 style={{ color: "#4dbd74"}}>Withdraw fund</h3>
                    {transaction.error && transaction.error.length > 0 ? <p style={{ color: "#ff0000"}}>{transaction.error}</p> : null}
                    <p className="text-muted">Enter amount to withdraw here</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <b className="">&#8358;</b>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Amount"
                        value={amount}
                        onChange={( e ) => onChange( e, "amount" )}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-credit-card"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Your card number"
                        value={cardNo}
                        onChange={( e ) => onChange( e, "cardNo" )}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="12">
                        {transaction.loading === true ? <Spinner color="primary" /> : (
                          <Button color="success" className="px-4">Send</Button>
                        )}
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="12" xl="4" >
            <Button color="success" onClick={this.toggleState}>{showStatement ? "Hide account statement" : "View account statement"}</Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-5">
          <Col xs="12" xl="12" >
            {this.displayStatement()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Content;