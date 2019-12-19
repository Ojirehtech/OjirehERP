import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoanMenu from "./Menu/Container";
import { getUser } from "../../store/actions/action_user";
import { isAuthenticated } from "../../helper/authenticate";

class Container extends Component{
  state = {
    step: 0
  }

  async componentDidMount() {
    const { getUser } = this.props;
    const userId = isAuthenticated().user._id;
    try {
      await getUser(userId);
    } catch(err) {}
  }
  
  render() {
    const { loan } = this.props;

    if ( loan.otp && loan.otp.message === "Success" ) {
      return <Redirect to="/menu" />
    }

    return (
      <div>
        <LoanMenu />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    loan: state.loan,
    login: state.login,
    agent: state.agent,
    users: state.users
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getUser: (data) => dispatch(getUser(data)),
  }

  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Container );
