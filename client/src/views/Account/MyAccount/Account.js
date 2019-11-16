import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUser } from '../../../store/actions/action_user';
import Content from './Content';
import { withdrawalRequest, fetchRequest } from '../../../store/actions/actions_transaction';


class Carousels extends Component {
  state = {
    amount: ""
  }

  async componentDidMount() {
    const { getUser, fetchRequest } = this.props;
    document.title = "My account"
    try {
      await getUser();
      await fetchRequest();
    } catch(err) {}
  }
  
  onRequestClick = async ( e ) => {
    e.preventDefault();
    const { withdrawalRequest } = this.props;
    const { amount } = this.state;
    const data = {
      amount
    }
    try {
      await withdrawalRequest(data);
    }catch(err) {}
  }

  onChange = ( e, name ) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
  }
  render() {
    const { users, transaction } = this.props;
    const { amount } = this.state;
    return (
      <div className="card">
        <div className="card-body">
        <Content
          users={users}
          amount={amount}
          onRequestClick={this.onRequestClick}
          onChange={this.onChange}
          transaction={transaction}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.users,
    transaction: state.transaction,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getUser: () => dispatch( getUser() ),
    fetchRequest: () => dispatch(fetchRequest()),
    withdrawalRequest: (data) => dispatch(withdrawalRequest(data))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousels);