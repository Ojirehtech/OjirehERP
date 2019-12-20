import React, { Component } from "react";
import { fetchLoans, fetchLoan, payLoan } from "../../../store/actions/action_loan";
import { connect } from "react-redux";
import Content from "./Content";

class LoanContainer extends Component{
  state = {

  }

  async componentDidMount() {
    const { fetchLoans } = this.props;
    try {
      await fetchLoans();
    } catch ( err ) { };
  }

  onPayLoan = async ( userId, loanId, amount ) => {
    const { payLoan } = this.props;
    const data = {amount}
    try {
      await payLoan( userId, loanId, data );
    }
    catch ( err ) { }
  }

  render() {
    const { loan } = this.props;
    return (
      <div>
        <Content
          loan={loan}
          onPayLoan={this.onPayLoan}
        />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    loan: state.loan
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    fetchLoans: () => dispatch( fetchLoans() ),
    fetchLoan: ( data ) => dispatch( fetchLoan( data ) ),
    payLoan: (userId,loanId, amount) => dispatch(payLoan(userId, loanId, amount))
  };
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanContainer)