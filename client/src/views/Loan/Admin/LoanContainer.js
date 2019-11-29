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

  render() {
    const { loan, payLoan } = this.props;
    console.log(loan, " this is the loan")
    return (
      <div>
        <Content
          loan={loan}
          payLoan={payLoan}
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
    payLoan: () => dispatch(payLoan())
  };
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanContainer)