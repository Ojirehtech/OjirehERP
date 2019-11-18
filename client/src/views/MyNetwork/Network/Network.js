import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { getByParentId } from '../../../store/actions/action_user';
import { isAuthenticated } from "../../../helper/authenticate";
import icon from "../../../assets/img/brand/user-icon.png";


class Network extends Component {
  async componentDidMount() {
    document.title = "My network";
    const { getByParentId } = this.props;
    try {
      await getByParentId();
    }catch(err) {}
  }
  render() {
    const { users } = this.props;
    const network = users.users && users.users;
     return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-body">
            <Row className="justify-content-md-center">
              <Col xs="4" xl="2">
                <div>
                  <img src={icon} style={{ width: "50px", marginLeft: 13 }} alt="" />
                   <p style={{ color: "#4dbd74"}}>{isAuthenticated().user.name}</p>
                </div>
              </Col>
            </Row>
            <Row>
               {network.map( line => (
                 <div key={line._id} style={{ marginLeft: 5 }}>
                   <img src={icon} alt="" style={{ width: "40px" }} />
                   {/* <p>{line.name}</p> */}
                </div>
              ))}
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
