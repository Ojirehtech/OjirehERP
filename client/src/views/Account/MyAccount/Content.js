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
  Alert,
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
    const { users } = this.props;
    const transactions = users.user && users.user.request && users.user.request.length > 0 ? 
      users.user.request.map( (transaction, index) => {
        return (
          <tr>
            <th scope="row" key={transaction._id}>{index + 1}</th>
            <td>{transaction.name}</td>
            <td>{transaction.balance}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.date}</td>
            <td>{transaction.time}</td>
            <td>{transaction.type}</td>
          </tr>
        )
      } ) : <p>No transaction yet</p>
    
    console.log(users.user, " current logged in user")
    const { showStatement } = this.state;
    if ( showStatement ) {
      return (
        <Table className="mt-5">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Total balance</th>
              <th>Amount withdraw</th>
              <th>Date</th>
              <th>Time</th>
              <th>Transaction type</th>
            </tr>
          </thead>
          <tbody>
            {transactions}
          </tbody>
        </Table>
      )
    }
  }
  
  render() {
    const { showStatement } = this.state;
    const { users, onRequestClick, onChange, transaction, amount } = this.props;
    const user = users.user ? users.user : null;
    console.log(user, " user detaule")
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="4">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <h3 className="mb-3">Available Balance</h3>
                <h4 className="mb-3">&#8358;{user && user.balance}</h4>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-5">
          <Col xs="12" xl="4" >
            <CardGroup>
              <Card>
                <CardBody>
                  <Form onSubmit={onRequestClick}>
                    <h3>Withdraw fund</h3>
                    {transaction.error && transaction.error.length > 0 ? <Alert color="danger">{transaction.error}</Alert> : null}
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
                          <Button color="primary" className="px-4">Send</Button>
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
            <Button color="primary" onClick={this.toggleState}>{showStatement ? "Hide account statement" : "View account statement"}</Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="12" xl="8" >
            {this.displayStatement()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Content;