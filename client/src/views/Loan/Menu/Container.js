import React, { Component } from "react";
import { connect } from "react-redux";
import Payloan from "./Payloan";
import ActionForm from "./ActionForm";
import OfferPage from "./OfferPage";
import { getUser } from "../../../store/actions/action_user";

class Container extends Component{
  state = {
    action: ""
  }

  async componentDidMount() {
    const { getUser } = this.props;
    try {
      await getUser();
    } catch(err) {}
  }

  handleChange = ( e ) => {
    this.setState( {
      action: e.target.value
    } );
  }

  renderView = () => {
    const { users } = this.props;
    const { action} = this.state;
    switch (action) {
      case "pay":
        return <Payloan users={users} />
      case "offer":
        return <OfferPage users={users}/>
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
    users: state.users
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatProps = {
    getUser: () => dispatch(getUser())
  }

  return dispatProps;
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);