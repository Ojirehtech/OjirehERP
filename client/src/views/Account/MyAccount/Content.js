import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Table,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
  CardGroup
} from 'reactstrap';

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
    const { users, transaction } = this.props;
    const request = transaction.requests && transaction.requests;
    
    console.log(users.user, " current logged in user")
    const { showStatement } = this.state;
    if ( showStatement ) {
      return (
        <Table className="mt-5">
          <thead>
            <tr style={{ color: '#20a8d8' }}>
              <th>S/N</th>
              <th>Name</th>
              <th>Bal before</th>
              <th>Amount withdraw</th>
              <th>Date</th>
              <th>Time</th>
              <th>Transaction type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction.requestLoading === true ? <Spinner color="primary" /> : (
              request.length > 0 ? request.map( ( req, i ) => (
                <tr key={req._id}>
                  <th scope="row" key={transaction._id}>{i + 1}</th>
                  <td>{req.userId && req.userId.name}</td>
                  <td>{req.balance}</td>
                  <td>{req.amount}</td>
                  <td>{req.createdAt && req.createdAt.slice(0, 10)}</td>
                  <td>{req.createdAt.slice(11, 16)}</td>
                  <td>Withdraw</td>
                  <td>{req.status === false ? "False" : "Complete"}</td>
                </tr>
              )) : "Request list is empty"
            )}
          </tbody>
        </Table>
      )
    }
  }
  
  render() {
    const { showStatement } = this.state;
    const { users, onRequestClick, onChange, transaction, amount } = this.props;
    const user = users.user ? users.user : null;
   console.log(transaction, " transaction request")
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="4">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <h3 className="mb-3">Available Balance</h3>
                <h2 className="mb-3"><strong>&#8358;{user && user.balance ? user.balance : 0}.00</strong></h2>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="12" xl="5">
            {transaction.success === true ? <p style={{ color: "#00ff00"}}>Your request has been recieved and will be processed within 3 hours</p> : null}
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