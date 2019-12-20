import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink, 
  Table,
  Row, Col
} from 'reactstrap';
import moment from "moment"
import classnames from 'classnames';

const Content = ( props ) => {
  const loans = props.loan && props.loan.loans;
  const [ activeTab, setActiveTab ] = useState( '1' );
  const pendingLoan = [];
  const paidLoan = [];
  if ( loans && loans.length > 0 ) {
    for ( let i = 0; i < loans.length; i++ ) {
      if ( loans[ i ].paid === true ) {
        paidLoan.push( loans[ i ] );
      } else {
        pendingLoan.push( loans[ i ] );
      }
    }
  }
  
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
            style={{ color: '#20a8d8' }}
          >
            All Loan
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames( { active: activeTab === '2' } )}
            onClick={() => { toggle( '2' ); }}
            style={{ color: '#20a8d8' }}
          >
            Paid
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames( { active: activeTab === '3' } )}
            onClick={() => { toggle( '3' ); }}
            style={{ color: '#20a8d8' }}
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
                      <td>{moment( loan.created ).format( "DD/MM/YYYY" )}</td>
                      <td>{loan.paid === true ? "Paid" : "Pending"}</td>
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
                  </tr>
                </thead>
                <tbody>
                  {paidLoan && paidLoan.length > 0 ? paidLoan.map( ( loan, i ) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{loan.userId && loan.userId.name}</td>
                      <td>{loan.userId && loan.userId.email}</td>
                      <td>{loan.userId && loan.userId.phone}</td>
                      <td>{loan.amount}</td>
                      <td>{moment( loan.created ).format( "DD/MM/YYYY" )}</td>
                      <td>{loan.paid === true ? "Paid" : "Pending"}</td>
                    </tr>
                  ) ) : "List empty"}
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
                  {pendingLoan && pendingLoan.length > 0 ? pendingLoan.map( ( loan, i ) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{loan.userId && loan.userId.name}</td>
                      <td>{loan.userId && loan.userId.email}</td>
                      <td>{loan.userId && loan.userId.phone}</td>
                      <td>{loan.amount}</td>
                      <td>{moment( loan.created ).format( "DD/MM/YYYY" )}</td>
                      <td>{loan.paid === true ? "Paid" : "Pending"}</td>
                      <td><span 
                        className="btn btn-success"
                        onClick={() => props.onPayLoan( loan.userId._id,loan._id, loan.amount )}>Reclaim loan</span></td>
                    </tr>
                  ) ) : "List empty"}
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
