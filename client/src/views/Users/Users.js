import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import moment from "moment";

import { getUsers } from '../../store/actions/action_user';

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
  async componentDidMount() {
    const { getUsers } = this.props;
    try {
      await getUsers();
    } catch(err) {}
  }

  render() {
    const { users } = this.props;
    const userData = users.users && users.users;

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
                      <th scope="col">Role</th>
                      <th scope="col">Joined</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map( ( user, index ) =>
                      <UserRow users={users} key={index} ind={index} user={user} />
                    )}
                  </tbody>
                </Table>
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
    getUsers: () => dispatch(getUsers())
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
