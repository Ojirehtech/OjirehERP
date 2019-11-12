import React, { Component } from "react";
import { connect } from "react-redux";
import { fundTransfer } from "../../store/actions/actions_transaction";
import { Row, Col } from "reactstrap";
import { isAuthenticated } from "../../helper/authenticate";
import Content from "./Content";
import cue from "../../assets/img/brand/image10.jpg";

class Transfer extends Component {
  state = {
    phone: "",
    amount: "",
  }
  onHandleChange = (e, name) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { fundTransfer } = this.props;
    const { phone, amount } = this.state;
    const accountHolder = isAuthenticated().user.name;
    const userId = isAuthenticated().user._id;
    const data = {
      phone, amount, accountHolder, userId
    }
    try {
      await fundTransfer(data)
    } catch(err) {}
  }

  render() {
    const { phone, amount } = this.state;
    const { transaction } = this.props;
    return (
      <div>
        <Row>
          <Col xs="12" xl="6">
            <Row className="justify-content-md-center">
              <Content
                phone={phone}
                amount={amount}
                onHandleChange={this.onHandleChange}
                onSubmit={this.onSubmit}
                transaction={transaction}
              />
            </Row>
          </Col>
          <Col xs="12" xl="6">
            <img
              src={cue}
              alt=""
              style={{ width: "100%", height: 450}}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    transaction: state.transaction
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    fundTransfer: (data) => dispatch(fundTransfer(data))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);