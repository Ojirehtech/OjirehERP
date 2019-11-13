import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { getByParentId } from '../../../store/actions/action_user';
import icon from "../../../assets/img/brand/user-icon.png";


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
            <Row className="justify-content-md-center">
              <Col xs="4" xl="4">
                <img src={icon} style={{ width: "50px" }} alt="" />
              </Col>
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
