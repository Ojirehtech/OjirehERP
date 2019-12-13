import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUser, getByParentId } from '../../../store/actions/action_user';
import Content from './Content';
import { withdrawalRequest, fetchRequest } from '../../../store/actions/actions_transaction';
import { isAuthenticated } from '../../../helper/authenticate';


class Carousels extends Component {
  state = {
    amount: "",
    message: "",
  }

  async componentDidMount() {
    const { getUser, fetchRequest, getByParentId } = this.props;
    document.title = "My account";
    const userId = isAuthenticated().user._id;
    try {
      await getUser(userId);
      await fetchRequest();
      await getByParentId();
    } catch(err) {}
  }
  
  onRequestClick = async ( e ) => {
    e.preventDefault();
    const { withdrawalRequest, users } = this.props;
    const { amount } = this.state;
    const userLength = users.users && users.users.length;
    const username = isAuthenticated().user.name;
    const data = {
      amount
    }
    try {
      if ( ( userLength >= 10 ) && new Date().getDate() <= 18 ) {
        await withdrawalRequest(data);
      } else {
        await this.setState( { message: `Dear ${username} your referral is less than 10. Build it up so you can withdraw. We strongly believe that you are a champion and you have what it takes 💪🝿..so lets do this.` } );
      }
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
            message={this.state.message}
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
    getUser: (data) => dispatch( getUser(data) ),
    fetchRequest: () => dispatch(fetchRequest()),
    withdrawalRequest: ( data ) => dispatch( withdrawalRequest( data ) ),
    getByParentId: () => dispatch(getByParentId())
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousels);