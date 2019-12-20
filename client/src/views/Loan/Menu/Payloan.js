import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLoan, payLoan } from "../../../store/actions/action_loan";
import { Row, Col, Card, CardBody } from "reactstrap";

class Payloan extends Component{
  async componentDidMount() {
    const { fetchLoan } = this.props;
    try {
      await fetchLoan();
    } catch(err) {}
  }

  onPayLoan = async ( userId, loanId, amount ) => {
    const data = { amount };
    try {
      await payLoan( userId, loanId, data );
    }
    catch(err) {}
  }

  render() {
    const { loan } = this.props;
    const lo = loan.loan && loan.loan;
    const pendingLoan = {}
    if ( lo && lo.length > 0 ) {
      for ( let i = 0; i < lo.length; i++ ) {
        if ( lo.paid === false ) {
          pendingLoan[ loan ] = lo[ i ];
        }
      }
    }

    console.log( pendingLoan, " this is the pending loan" )
    // 5dde243c6853f4024dd48849
    return (
      <div>
        <h3>Pay back your loan</h3>
        <Row className="justify-content-center">
          <Col xs="10" xl="5">
            <Card>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    loan: state.loan
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchToProps = {
    payLoan: ( userId, loanId, data ) => dispatch( payLoan( userId, loanId, data)),
    fetchLoan: () => dispatch(fetchLoan())
  }
  return dispatchToProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Payloan);