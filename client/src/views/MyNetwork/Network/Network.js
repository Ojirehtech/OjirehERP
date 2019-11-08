import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row } from "reactstrap";
import { getByParentId } from '../../../store/actions/action_user';


class Network extends Component {
  async componentDidMount() {
    const { getByParentId } = this.props;
    try {
      await getByParentId();
    }catch(err) {}
  }
  render() {
    console.log(this.props)
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Theme colors
          </div>
          <div className="card-body">
            <Row>
              
            </Row>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Grays
          </div>
          <div className="card-body">
            <Row className="mb-3">
              
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getByParentId: () => dispatch(getByParentId())
  }
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Network);
