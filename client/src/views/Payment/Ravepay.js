import React, { Component } from "react";
import Rave from 'react-flutterwave-rave'

class Ravepay extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      key: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXXXX-X", // RavePay PUBLIC KEY
      phone: "0000000000000",
      amount: 2000,
      firstname: "Oluwole",
      lastname: "Adebiyi",
      email: "test@test.com",
      room_number: "23A",
      hostel: "Silver 1",
      ticket_number: 3,
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
    );
  }
}

export default Ravepay;