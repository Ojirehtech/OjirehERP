import React, { Component } from "react";
import { fetchLoans, fetchLoan } from "../../../store/actions/action_loan";
import { connect } from "react-redux";
import Content from "./Content";

class LoanContainer extends Component{
  render() {
    return (
      <div>
        <Content />
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
    fetchLoan: ( data ) => dispatch( fetchLoan( data ) )
  };
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanContainer)