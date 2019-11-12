import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUser } from '../../../store/actions/action_user';
import Content from './Content';
import { withdrawalRequest } from '../../../store/actions/actions_transaction';


class Carousels extends Component {
  state = {
    amount: ""
  }

  async componentDidMount() {
    const { getUser } = this.props;
    try {
      await getUser()
    } catch(err) {}
  }
  
  onRequestClick = async () => {
    const { withdrawalRequest } = this.props;
    try {
      await withdrawalRequest();
    }catch(err) {}
  }

  onChange = ( e, name ) => {
    
  }
  render() {
    const { users } = this.props;
    return (
      <div>
        <Content users={users} />
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
    withdrawalRequest: (data) => dispatch(withdrawalRequest(data))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousels);