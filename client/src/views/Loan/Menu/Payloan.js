import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLoan, payLoan } from "../../../store/actions/action_loan";
import { Spinner, Row, Col, Card, CardBody, Button } from "reactstrap";

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
    let pendingLoan = {};
    if ( lo && lo.length > 0 ) {
      for ( let i = 0; i < lo.length; i++ ) {
        if ( lo[i].paid === false ) {
          pendingLoan[loan] = lo[ i ];
        }
      }
    }

    return (
      <div>
        <Row className="justify-content-center">
          <Col xs="10" xl="12">
            <Card style={{height: "500px", width: "100%"}}>
              <CardBody>
                
                <Row className="justify-content-center">
                  <Col xs="4" xl="5">
                    {pendingLoan[loan] && pendingLoan[loan].amount > 0 ? (
<>
                      <Row className="justify-content-center">
                        <h1
                          style={{
                            color: "#4dbd74",
                            marginTop: "120px",
                          }}
                        >Loan Settlement</h1>
                        <h3 style={{
                          color: "#ff0000"
                        }}>AMOUNT: &#8358; {pendingLoan[ loan ] && pendingLoan[ loan ].amount ? pendingLoan[ loan ].amount + ".00" : 0.00}</h3>
                        <p>Click on the button below to settle your loan</p>
                      </Row>
                      {loan.loading === true ? <Spinner color="primary" /> : (
                        <Button
                          color="success"
                          style={{
                            padding: 10,
                            width: "100%",
                            marginTop: "1px"
                          }}
                          onClick={() => this.onPayLoan( pendingLoan[ loan ].userId, pendingLoan[ loan ]._id, pendingLoan[ loan ].amount )}
                        >Pay Loan</Button>
                      )}
                    </>
                    ) : <div style={{
                        paddingTop: "100px",
                        paddingLeft: "70px",
                      }}>
                        <h3>No outstanding loan</h3>
                          <i
                            className="icon-briefcase"
                            style={{
                              opacity: 0.4,
                              fontSize: "200px",
                            }}
                          ></i>
                      </div>
                    }
                  </Col>
                </Row>
                
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