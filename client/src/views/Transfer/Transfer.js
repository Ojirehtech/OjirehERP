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
    const { fundTransfer } = this.props;
    const { phone, amount } = this.state;
    const sender = isAuthenticated().user.name;
    const userId = isAuthenticated().user._id;
    const data = {
      phone, amount, sender, userId
    }
    try {
      await fundTransfer(data)
    } catch(err) {}
  }

  render() {
    const { phone, amount } = this.state;
    const { transaction } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <Row>
            <Col xs="12" xl="6">
              <Row className="justify-content-md-center mt-5">
                <Col xs="12" xl="12">
                  <Content
                    phone={phone}
                    amount={amount}
                    onHandleChange={this.onHandleChange}
                    onSubmit={this.onSubmit}
                    transaction={transaction}
                  />
                </Col>
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