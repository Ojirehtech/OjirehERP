import React, { Component } from "react";
import Rave from 'react-flutterwave-rave'
import { Row, Col } from "reactstrap";
import cue from "../../assets/img/brand/cue.jpg";

class Ravepay extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      
    }
    this.callback = this.callback.bind( this );
    this.close = this.close.bind( this );
  }

  callback = async ( response ) => {
    const { payIncentives } = this.props;
    if ( response.success === true ) {
      try {
        await payIncentives()
      } catch ( err ) { }
    }
  }

  close = () => {
    console.log( "Payment closed" );
  }

  render() {
    const { phone, email, amount, pubKey } = this.props;
    
    return (
      <Row className="justify-content-md-center mt-5">
        <Col xs="12" xl="10">
          <Row className="justify-content-md-center">
            <Col xs="12" xl="6">
              <div className="App">
                <Rave
                  pay_button_text="Pay With Rave"
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
            <Col xs="12" xl="6">
              <img src={cue} alt="" style={{
                width: "100%",
                height: 250
              }} />
            </Col>
          </Row>
          </Col>
      </Row>
    );
  }
}

export default Ravepay;