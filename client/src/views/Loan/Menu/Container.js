import React, { Component } from "react";
import { connect } from "react-redux";
import Payloan from "./Payloan";
import ActionForm from "./ActionForm";
import OfferPage from "./OfferPage";
import { getUser } from "../../../store/actions/action_user";
import { fetchLoan, loanRequest } from "../../../store/actions/action_loan";
import { isAuthenticated } from "../../../helper/authenticate";

class Container extends Component{
  state = {
    action: ""
  }

  async componentDidMount() {
    const { getUser, fetchLoan } = this.props;
    const userId = isAuthenticated().user._id;
    try {
      await getUser(userId);
      await fetchLoan()
    } catch(err) {}
  }

  handleChange = ( e ) => {
    this.setState( {
      action: e.target.value
    } );
  }

  renderView = () => {
    const { users, loanRequest, loan } = this.props;
    const { action} = this.state;
    switch (action) {
      case "pay":
        return <Payloan users={users} />
      case "offer":
        return <OfferPage users={users} loan={loan} loanRequest={loanRequest} />
      default:
        return <ActionForm handleChange={this.handleChange} />;
    }
  }
  render() {
    return (
      <div>
       {this.renderView()}
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.users,
    loan: state.loan
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatProps = {
    getUser: (data) => dispatch( getUser(data) ),
    fetchLoan: () => dispatch( fetchLoan() ),
    loanRequest: (data) => dispatch(loanRequest(data))
  }

  return dispatProps;
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);