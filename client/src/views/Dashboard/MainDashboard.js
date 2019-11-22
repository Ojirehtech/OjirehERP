import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { connect } from "react-redux";
import { isAuthenticated } from "../../helper/authenticate";
import SocialShare from '../Share/SocialShare';
import { updateParentId, getByParentId, getUser } from '../../store/actions/action_user';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  async componentDidMount() {
    const { updateParentId, getUser, getByParentId } = this.props;
    document.title = "Dashboard"
    try {
      await updateParentId();
      await getUser();
      await getByParentId();
    }catch(err) {}
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const { users } = this.props;
    const user = users.user && users.user;
    const networkCount = users.user && users.user.networks;
    const refererLink = isAuthenticated().user ? isAuthenticated().user.refererLink : null;
    const earnings = user.earnings && user.earnings;
    let sumEarning;
    if ( earnings && earnings.length ) {
      let allEarnings = [];
      for ( let i = 0; i < earnings.length; i++ ) {
        const date = new Date();
        date.setDate( date.getDate() - 30 );
        const dateString = date.toISOString().split( 'T' )[ 0 ];
        // if ( earnings[ i ] && earnings[ i ].date && earnings[ i ].date.toISOString().split( "T" )[ 0 ] >= dateString ) {
        //   allEarnings.push( earnings[ i ].amount );
        // }
      }
      sumEarning = allEarnings.reduce( ( a, b ) => a + b, 0 );
    }
    
    return (
      <div className="card animated fadeIn">
        <div className="card-body">
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-success">
                <CardBody className="pb-0">
                  <div><h3><strong>Bal</strong>: <strong>&#8358;{user.balance ? user.balance : 0}.00</strong></h3></div>
                  <div className="mb-4">
                    <p><Link
                      to="/account"
                      style={{
                        color: "#fff",
                        textDecoration: "none"
                      }}
                    >Click to Withdraw fund</Link></p>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-info">
                <CardBody className="pb-0">
                   <div><h3><strong>Earning</strong>: <strong>&#8358;{sumEarning ? sumEarning : 0}.00</strong></h3></div>
                  <div className="mb-4">
                    <p>Since Last 30 days</p>
                  </div>
                </CardBody>
                
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-danger">
                <CardBody className="pb-0">
                  <div><h3><strong>{networkCount ? networkCount : 0}</strong></h3></div>
                  <div className="mb-4">Total Network</div>
                </CardBody>
                
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-primary">
                <CardBody className="pb-0">
                  <div className="text-value">9.823</div>
                  <div className="mb-4">Indirect Network</div>
                </CardBody>

              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-5">
            <Col xs="12" xl="6">
              <div style={{
                background: "rgb(0, 172, 237)",
                boxSize: "border-box",
                padding: 5,
                paddingRight: "10px",
                marginBottom: 15,
                color: "#fff",
                borderRadius: 5,
                fontSize: "15px",
              }}>
                Your referer Link: {refererLink}
              </div>
              <Row className="justify-content-md-center">
                <Col xs="12" xl="6">
                  <SocialShare />
                  <p>Share to your social Networks</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
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
  const dispatchProps = {
    updateParentId: () => dispatch( updateParentId() ),
    getByParentId: () => dispatch( getByParentId() ),
    getUser: () => dispatch(getUser()),
  }
  return dispatchProps;
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
