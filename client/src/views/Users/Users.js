import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import moment from "moment";

import { getUsers } from '../../store/actions/action_user';
import PaginationCount from './PaginationCount';

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user._id}`
  const ind = props.ind;
  return (
    <tr key={user._id}>
      <th scope="row"><Link to={userLink}>{ind + 1}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{moment( user.createdAt ).format( "DD/MM/YYYY" )}</td>
      <td>{user.role}</td>
      <td><Link to={userLink}><Badge color="primary">View</Badge></Link></td>
    </tr>
  );
}

class Users extends Component {
  state = {
    userData: null,
    current_page: null,
    total_pages: null,
    total_users: null,
    per_page: null
  }

  async componentDidMount() {
    const { getUsers } = this.props;
    const page = 1
    try {
      await getUsers(page);
    } catch(err) {}
  }

  handlePagination = async ( page ) => {
    const { getUsers } = this.props;
    try {
      await getUsers(page);
    } catch ( err ) { }
  }

  render() {
    const { users } = this.props;
    const userData = users.users.users && users.users.users;
    const current_page = users.users && users.users.current_page;
    const total_pages = users.users && users.users.totalUser;
    const total_users = users.users && users.users.totalUsers;
    const per_page = users.users && users.users.per_page;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Agents List
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Joined</th>
                      <th scope="col">Role</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData ? userData.map( ( user, index ) =>
                      <UserRow users={users} key={index} ind={index} user={user} />
                    ) : "Loading..."}
                  </tbody>
                </Table>
                {userData && userData.length > 0 ? (
                  <PaginationCount
                    total_pages={total_pages}
                    total_users={total_users}
                    current_page={current_page}
                    per_page={per_page}
                    handlePagination={this.handlePagination}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
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
    getUsers: ( data ) => dispatch( getUsers( data ) ),
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
