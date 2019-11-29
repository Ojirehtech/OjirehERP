import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink, 
  Table,
  // Card, 
  // Button,
  // CardTitle,
  // CardText,
  Row, Col
} from 'reactstrap';
import classnames from 'classnames';

const Content = ( props ) => {
  const loans = props.loan && props.loan.loans;
  console.log(loans, " all the loans")
  const [ activeTab, setActiveTab ] = useState( '1' );

  const toggle = tab => {
    if ( activeTab !== tab ) setActiveTab( tab );
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames( { active: activeTab === '1' } )}
            onClick={() => { toggle( '1' ); }}
          >
            All Loan
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames( { active: activeTab === '2' } )}
            onClick={() => { toggle( '2' ); }}
          >
            Paid
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames( { active: activeTab === '3' } )}
            onClick={() => { toggle( '3' ); }}
          >
            Pending Loans
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Table className="mt-5">
                <thead>
                  <tr style={{ color: '#20a8d8' }}>
                    <th>S/N</th>
                    <th>Sender</th>
                    <th>Amount</th>
                    <th>Reciever</th>
                    <th>Reciever phone</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                      <Content
                       
                      />
                   
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h3>Paid loans</h3>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <h3>pending loans</h3>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Content;