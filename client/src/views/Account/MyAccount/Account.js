import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUser, getByParentId } from '../../../store/actions/action_user';
import Content from './Content';
import { withdrawalRequest, fetchRequest } from '../../../store/actions/actions_transaction';
import { isAuthenticated } from '../../../helper/authenticate';
import { getTransferByUser } from '../../../store/actions/action_transfer';


class Carousels extends Component {
  state = {
    amount: "",
    cardNo: "",
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
      await this.handleApiCall();
    } catch(err) {}
  }

  handleApiCall = async () => {
    const { getTransferByUser } = this.props;
    try {
      await getTransferByUser();
    }
    catch(err) {}
  }
  
  onRequestClick = async ( e ) => {
    e.preventDefault();
    const { withdrawalRequest, users } = this.props;
    const { amount, cardNo } = this.state;
    const userLength = users.users && users.users.length;
    const username = isAuthenticated().user.name;
    const data = {
      amount, cardNo
    }
    try {
      if ( ( userLength >= 10 ) && new Date().getDate() <= 31 ) {
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
    const { users, transaction, transfer } = this.props;
    const { amount, cardNo } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <Content
            users={users}
            amount={amount}
            cardNo={cardNo}
            message={this.state.message}
            onRequestClick={this.onRequestClick}
            onChange={this.onChange}
            transaction={transaction}
            transfer={transfer}
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
    transfer: state.transfer,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getUser: (data) => dispatch( getUser(data) ),
    fetchRequest: () => dispatch(fetchRequest()),
    withdrawalRequest: ( data ) => dispatch( withdrawalRequest( data ) ),
    getTransferByUser: () => dispatch(getTransferByUser()),
    getByParentId: () => dispatch(getByParentId())
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousels);