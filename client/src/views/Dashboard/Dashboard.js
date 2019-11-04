import React, { Component } from 'react';
import {
  Card,
  CardBody,
  
  Col,
  
  Row,
} from 'reactstrap';

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

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="6">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div className="mb-4">Direct Network</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="6">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div className="mb-4">Indirect Network</div>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
