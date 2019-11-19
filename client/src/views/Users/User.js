import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getUser } from '../../store/actions/action_user';
import avatar from "../../assets/img/brand/avatar.jpg";
import { assignRole } from '../../store/actions/action.role';

const BASE_URL = process.env.REACT_APP_API_URL;

class User extends Component {
  state = {
    photo: ""
  }

  async componentDidMount() {
    document.title = "Profile page"
    const { getUser } = this.props;

    try {
      await getUser();
    } catch ( err ) { }
  }

  onChange = ( e ) => {
    let photo = e.target.files[ 0 ];
    this.setState( { photo: photo } );
  }

  handleSubmit = async ( e, role, userId ) => {
    e.preventDefault();
    console.log( "you clicked to submit" )
    const { assignRole } = this.props;
    console.log( role, userId)
    try {
      await assignRole( role, userId )
    } catch ( err ) { }
  }

  render() {
    const { users, role } = this.props;
    const user = users.user && users.user;
    return (
      <div className="card app flex-row">
        <div className="card-body">
          <Container>
            <Row>
              <Col md="3">
                <Card>
                  <CardBody>
                    <img
                      src={`${ BASE_URL }/profile/photo/${ user._id }`}
                      style={{
                        width: "100%",
                        height: "200px",
                        padding: 0
                      }}
                      onError={i => i.target.src = `${ avatar }`}
                      alt="profile" />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h3 style={{ color: "#4dbd74" }}>{user.name} profile</h3>
                        <Row>
                          <Col xs="12" xl="6">
                            <label>Name</label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="text"
                                placeholder="First name"
                                value={user.name}
                              />
                            </InputGroup>
                          </Col>
                          <Col xs="12" xl="6" className="text-right">
                            <label>Email</label>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-envelope"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="text"
                                placeholder="Last name"
                                value={user.email}
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" xl="6">
                            <label>Phone</label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-phone"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="text"
                                placeholder="Email"
                                value={user.phone}
                              />
                            </InputGroup>
                          </Col>
                          <Col xs="12" xl="6" className="text-right">
                            <label>Referer phone</label>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-phone"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="text"

                                value={user.refererPhone}
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" xl="6">
                            <label>Address</label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-home"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="text"
                                placeholder="Referer phone"
                                value={user.address}
                              />
                            </InputGroup>
                          </Col>
                          <Col xs="12" xl="6">
                            <label>Role</label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-home"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              {role.loading === true ? <Spinner color="primary" /> : (
                                <Input
                                  type="text"
                                  placeholder="Role"
                                  value={user.role}
                                />
                              )}
                              
                            </InputGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>

                </CardGroup>
              </Col>
              <Col md="4">
                <Row>
                  <Col md="6">
                    <h6 style={{ color: "#4dbd74"}}>Assign roles to user</h6>
                    <Row className="mt-3">
                      <Col xs="12" xl="12">
                        <Button
                          onClick={( e ) => this.handleSubmit( e, "admin", user._id )}
                          color="primary"
                        >Admin role</Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs="12" xl="12">
                        <Button
                          onClick={( e ) => this.handleSubmit( e, "support", user._id )}
                          color="success"
                        >Support role</Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs="12" xl="12">
                        <Button
                          onClick={( e ) => this.handleSubmit( e, "agent", user._id )}
                          color="danger"
                        >Agent role</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

}

const mapStateToProps = ( state ) => {
  return {
    users: state.users,
    role: state.role,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getUser: () => dispatch( getUser() ),
    assignRole: (role, userId) => dispatch(assignRole(role, userId))
  }
  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( User );
