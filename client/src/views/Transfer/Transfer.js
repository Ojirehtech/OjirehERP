import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { isAuthenticated } from "../../helper/authenticate";
import Content from "./Content";
import { makeTransfer } from "../../store/actions/action_transfer";
 
class Transfer extends Component {
  state = {
    phone: "",
    amount: "",
    message: ""
  }

  componentDidMount() {
    document.title = "Transfer page";
  }

  onHandleChange = (e, name) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { makeTransfer } = this.props;
    const { phone, amount } = this.state;
    const sender = isAuthenticated().user.name;
    const userId = isAuthenticated().user._id;
    const network = isAuthenticated().user.networks;
    const data = {
      phone, amount, sender, userId
    }
    try {
      if ( network >= 10 ) {
        await makeTransfer( data )
      } else {
        this.setState( { message: `Dear ${ sender } your referral is less than 10. Build it up so you can withdraw. We strongly believe that you are a champion and you have what it takes ...so lets do this.`})
      }
      
    } catch(err) {}
  }

  render() {
    const { phone, amount, message } = this.state;
    const { transfer } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <Row>
            <Col xs="12" xl="12">
              <Row className="justify-content-center mt-5">
                <Col xs="12" xl="6">
                  <Content
                    phone={phone}
                    message={message}
                    amount={amount}
                    onHandleChange={this.onHandleChange}
                    onSubmit={this.onSubmit}
                    transaction={transfer}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    transfer: state.transfer
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    makeTransfer: (data) => dispatch(makeTransfer(data))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);