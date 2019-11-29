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
import moment from "moment"
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loans && loans.length > 0 ? loans.map( ( loan, i ) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{loan.userId && loan.userId.name}</td>
                      <td>{loan.userId && loan.userId.email}</td>
                      <td>{loan.userId && loan.userId.phone}</td>
                      <td>{loan.amount}</td>
                      <td>{moment(loan.created).format("DD/MM/YYYY")}</td>
                    </tr>
                  )) : "List empty"}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Table className="mt-5">
                <thead>
                  <tr style={{ color: '#20a8d8' }}>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <Table className="mt-5">
                <thead>
                  <tr style={{ color: '#20a8d8' }}>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Content;