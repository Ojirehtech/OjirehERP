import React, { useState } from 'react';
import {
  TabContent, TabPane,
  Nav, NavItem, NavLink,
  Card, Button, CardTitle,
  CardText, Row, Col,
  Table, Spinner
} from 'reactstrap';
import classnames from 'classnames';

const DataTab = ( {transaction, request} ) => {
  const [ activeTab, setActiveTab ] = useState( '1' );

  const toggle = tab => {
    if ( activeTab !== tab ) setActiveTab( tab );
  }

  return (
    <div className="mt-4">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames( { active: activeTab === '1' } )}
            onClick={() => { toggle( '1' ); }}
          >
            Withdrawal Requests
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames( { active: activeTab === '2' } )}
            onClick={() => { toggle( '2' ); }}
          >
            Transfer Requests
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
                    <th>Bal before</th>
                    <th>Amount withdraw</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Transaction type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.requestLoading === true ? <Spinner color="primary" /> : (
                    request.length > 0 ? request.map( ( req, i ) => (
                      <tr key={req._id}>
                        <th scope="row" key={transaction._id}>{i + 1}</th>
                        <td>{req.userId && req.userId.name}</td>
                        <td>{req.balance}</td>
                        <td>{req.amount}</td>
                        <td>{req.createdAt && req.createdAt.slice( 0, 10 )}</td>
                        <td>{req.createdAt.slice( 11, 16 )}</td>
                        <td>Withdraw</td>
                        <td>{req.status === false ? "False" : "Complete"}</td>
                      </tr>
                    ) ) : "Request list is empty"
                  )}
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
                    <th>Bal before</th>
                    <th>Amount withdraw</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Transaction type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.requestLoading === true ? <Spinner color="primary" /> : (
                    request.length > 0 ? request.map( ( req, i ) => (
                      <tr key={req._id}>
                        <th scope="row" key={transaction._id}>{i + 1}</th>
                        <td>{req.userId && req.userId.name}</td>
                        <td>{req.balance}</td>
                        <td>{req.amount}</td>
                        <td>{req.createdAt && req.createdAt.slice( 0, 10 )}</td>
                        <td>{req.createdAt.slice( 11, 16 )}</td>
                        <td>Withdraw</td>
                        <td>{req.status === false ? "False" : "Complete"}</td>
                      </tr>
                    ) ) : "Request list is empty"
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default DataTab;