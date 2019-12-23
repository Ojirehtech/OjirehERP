import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form, Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import { getUser, updatedUser, deleteUser } from '../../../store/actions/action_user';
import avatar from "../../../assets/img/brand/avatar.jpg";
import { uploadProfilePhoto } from '../../../store/actions/action_edit';
import { isAuthenticated } from '../../../helper/authenticate';

const BASE_URL = process.env.REACT_APP_API_URL;

class Profile extends Component{
  state = {
    photo: "",
    name: "",
    phone: "",
    refererPhone: "",
    email: "",
    address: "",
    isProfile: false,
  }

  async componentDidMount() {
    document.title = "Profile page"
    const { getUser } = this.props;
    const userId = isAuthenticated().user._id;
    try {
      await getUser(userId);
    } catch(err) {}
  }
  
  onChange = ( e ) => {
    let photo = e.target.files[0];
    this.setState( { photo: photo } );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("you clicked to submit")
    const { uploadProfilePhoto } = this.props;
    let formData = new FormData();
    formData.append( "photo", this.state.photo );
    try {
      await uploadProfilePhoto(formData)
    } catch(err) {}
  }

  handleInputChange = ( e, name ) => {
    let fields = this.state;
    fields[ name ] = e.target.value;
    this.setState( { fields } );
    console.log(this.state)
  }

  toggleView = () => {
    this.setState( ( prevState ) => {
      return {
        isProfile: !prevState.isProfile
      }
    });
  }

  handleProfileSubmit = async (e) => {
    e.preventDefault();
    const { email, name, phone, refererPhone, address } = this.state;
    const { updatedUser } = this.props;
    const data = { email, name, phone, refererPhone, address };
    try {
      await updatedUser( data );
    }
    catch(err) {}
  }
  
  renderView = () => {
    const { users } = this.props;
    const user = users.user && users.user;
    const { name, email, phone, refererPhone, address } = this.state;
    if ( this.state.isProfile === true ) {
      return (
        <Col md="8">
          <CardGroup>
            <Card className="p-4">
              <CardBody>
                <Form onSubmit={this.handleProfileSubmit}>
                  <h3 style={{ color: "#4dbd74"}}>Update Your Profile</h3>
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
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => this.handleInputChange(e, "name")}
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
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={( e ) => this.handleInputChange( e, "email" )}
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
                          placeholder="Phone number"
                          value={phone}
                          onChange={( e ) => this.handleInputChange( e, "phone" )}
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
                          onChange={( e ) => this.handleInputChange( e, "refererPhone" )}
                          value={refererPhone}
                          placeholder="Referer phone"
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
                          placeholder="Address"
                          value={address}
                          onChange={( e ) => this.handleInputChange( e, "address" )}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="12">
                      {users.updateLoading === true ? <Spinner color="primary" /> : <Button color="success">Submit</Button>}
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>

          </CardGroup>
        </Col>
      )
    } else {
      return (
        <Col md="8">
          <CardGroup>
            <Card className="p-4">
              <CardBody>
                <Form>
                  {users.loading === true ? <Spinner color="primary" /> : (
                    <h3 style={{ color: "#4dbd74" }}>Your profile</h3>
                  )}
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
                          placeholder="Your name"
                          value={user.name}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="12" xl className="text-right">
                      <label>Email</label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={user.email}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6">
                      <label>Phone</label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Phone number"
                          value={user.phone}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="6" className="text-right">
                      <label>Referer phone</label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Referer phone"
                          value={user.refererPhone}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <label>Address</label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-home"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Address"
                          value={user.address}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      );
    }
  }
  
  render() {
    const { edit } = this.props;
    const userId = isAuthenticated().user._id;
    
    return (
      <div className="card app flex-row">
        <div className="card-body">
          <Container>
            <Row>
              <Col md="3">
                <Card>
                  <CardBody>
                    <img
                      src={`${ BASE_URL }/profile/photo/${ userId }`}
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
              {this.renderView()}
              <Col md="4">
                <Form encType="multipart/form-data">
                  <InputGroup className="mb-3">
                    <Input
                      type="file"
                      name={this.state.photo}
                      onChange={(e) => this.onChange(e)}
                    />
                  </InputGroup>
                </Form>
                <Row>
                  <Col md="6">
                    {edit.loading === true ? <Spinner color="primary" /> : (
                    <Button 
                        color='success' 
                      onClick={( e ) => this.handleSubmit( e )}
                      >
                      Upload photo
                    </Button>
                    )}
                    
                  </Col>
                  <Col md="6" className="edit-button">
                    <Button 
                      color='info' 
                      onClick={this.toggleView}
                      >
                      Edit profile
                    </Button>
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
    edit: state.edit,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getUser: (data) => dispatch( getUser(data) ),
    uploadProfilePhoto: ( data ) => dispatch( uploadProfilePhoto( data ) ),
    updatedUser: ( data ) => dispatch( updatedUser( data ) ),
    deleteUser: (data) => dispatch(deleteUser(data))
  }
  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
