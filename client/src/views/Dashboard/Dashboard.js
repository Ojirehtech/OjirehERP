import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';

import { isAuthenticated } from "../../helper/authenticate";
import SocialShare from '../Share/SocialShare';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const refererLink = isAuthenticated().user.refererLink;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">1234</div>
                <div className="mb-4">Ojirehprime card number</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div className="mb-4">Indirect Network</div>
              </CardBody>
              
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div className="mb-4">Indirect Network</div>
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
    );
  }
}

export default Dashboard;
