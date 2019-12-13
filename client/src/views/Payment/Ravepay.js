import React, { Component } from "react";
import Rave from 'react-flutterwave-rave';
// import history from "../../helper/history";
import { Row, Col } from "reactstrap";

class Ravepay extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      
    }
    this.callback = this.callback.bind( this );
    this.close = this.close.bind( this );
  }

  callback = async ( response ) => {
    const { payIncentives, refererPhone, onRegister } = this.props;
    if ( response.success === true ) {
      try {
        await onRegister();
        await payIncentives( refererPhone );
      } catch ( err ) { }
    }
  }

  close() {
    console.log("Close rave")
  }

  render() {
    const { phone, email, amount, pubKey } = this.props;
    return (
      <Row className="justify-content-md-center mt-5">
        <Col xs="12" xl="10">
          <Row className="justify-content-md-center">
            <Col xs="12" xl="6">
              <div className="App" style={{ display: !phone && !email ? "none" : "block"}}>
                <Rave
                  pay_button_text="Pay For Card"
                  className="btn btn-info"
                  metadata={[
                    { metaname: 'Card', metavalue: "OjirehPrime Card" }
                  ]}
                  payment_method="card"
                  customer_email={email}
                  customer_phone={phone}
                  amount={"" + amount + ""}
                  ravePubKey={pubKey}
                  callback={this.callback}
                  onclose={this.close}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Ravepay;