import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUser } from '../../../store/actions/action_user';
import Content from './Content';



class Carousels extends Component {

  async componentDidMount() {
    const { getUser } = this.props;
    try {
      await getUser()
    } catch(err) {}
  }
  
  render() {
    const { users } = this.props;
    return (
      <Content users={users} />
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getUser: () => dispatch(getUser()),
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousels);