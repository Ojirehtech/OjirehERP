import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getUser } from '../../../store/actions/action_user';
import avatar from "../../../assets/img/brand/avatar.jpg";
import { uploadProfilePhoto } from '../../../store/actions/action_edit';

const BASE_URL = "http://localhost:3030/api/v1";
class Profile extends Component{
  state = {
    photo: ""
  }

  async componentDidMount() {
    const { getUser } = this.props;

    try {
      await getUser();
    } catch(err) {}
  }
  onChange = ( e ) => {
    let photo = this.state; 
    photo[ e.target.name ] = e.target.files[ 0 ];
    this.setState( { photo } );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("you clicked to submit")
    const { uploadProfilePhoto } = this.props;
    const { photo } = this.state;
    const formData = new FormData();
    formData.append( "photo", photo );
    try {
      await uploadProfilePhoto(formData)
    } catch(err) {}
  }
  
  render() {
    const { users } = this.props;
    const user = users.user && users.user;
    return (
      <div className="app flex-row">
        <Container>
          <Row>
            <Col md="3">
              <Card>
                <CardBody>
                  <img
                    src={`${ BASE_URL }/profile/photo/${ user._id }`}
                    style={{
                      width: "100%",
                      height: "auto",
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
                      <h1>{user.firstName} {user.lastName} profile</h1>
                      <Row>
                        <Col xs="6">
                          <label>Firt name</label>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="First name"
                              value={user.firstName}
                            />
                          </InputGroup>
                        </Col>
                        <Col xs="6" className="text-right">
                          <label>Last name</label>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Last name"
                            value={user.lastName}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <label>Email</label>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Email"
                              value={user.email}
                            />
                          </InputGroup>
                        </Col>
                        <Col xs="6" className="text-right">
                          <label>Username</label>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              
                              value={user.username}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <label>Referer Phone number</label>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-phone"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Referer phone"
                              value={user.referPhone}
                            />
                          </InputGroup>
                        </Col>
                        <Col xs="6" className="text-right">
                          <label>Phone Number</label>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-phone"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Your phone number"
                              value={user.phone}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <label>State</label>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-home"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="State"
                              value={user.address && user.address.state}
                            />
                          </InputGroup>
                        </Col>
                        <Col xs="6" className="text-right">
                          <label>City</label>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-home"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="City"
                              value={user.address && user.address.city}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <label>Street</label>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-home"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              type="text"
                              value={user.address && user.address.street}
                              className="form-control"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">

                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
            <Col md="4">
              {users.error && users.error.length > 0 ? <Alert color="danger">{users.error}</Alert> : null}
              <Form enctype="multipart/form-data">
                <InputGroup className="mb-3">
                  <Input
                    type="file"
                    name="photo"
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </Form>
              <Row>
                <Col md="6">
                  {user.loading === true ? <Spinner color="primary" /> : (
                  <Button 
                    color='primary' 
                    onClick={( e ) => this.handleSubmit( e )}
                    >
                    Upload photo
                  </Button>
                  )}
                  
                </Col>
                <Col md="6">
                  <Link to="editProfile" className="btn btn-primary">Edit Profile</Link>
                </Col>
              </Row>
              
            </Col>
          </Row>
        </Container>
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
    getUser: () => dispatch( getUser() ),
    uploadProfilePhoto: (data) => dispatch(uploadProfilePhoto(data)),
  }
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
