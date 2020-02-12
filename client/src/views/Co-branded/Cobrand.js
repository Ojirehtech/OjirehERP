import React, { Component } from "react";
import Particles from "react-particles-js";
import { isAuthenticated } from "../../helper/authenticate";
import { 
  Row, 
  Button, 
  Col,  
  Card, 
  CardGroup, 
  CardBody 
} from "reactstrap";
import Header from "../Pages/Header/Header";
import PhotoUpload from "./Photo";
import CobrandForm from "./Form";

const particleOpt = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1500
      }
    }
  }
}

export default class Cobrand extends Component{
  state = {
    name: "",
    photo: "",
    email: "",
    phone: "",
    address: "",
    brand: "",
    isPhoto: false,
    errMessage: "",
    successMsg: "",
    sucMessage: "",
    step: 0,
    brandlist: [
      "PowerPorte",
      "bluekey",
      "ADEKSTAR GLOBAL LTD",
      "Micro saving card",
      "UNIC",
      "bitfxt",
      "Daily Need Alerts",
      "Clean Springs",
      "FIGURE BOSS",
      "Releaf Blend CBD Oil",
      "Federal Medical Center Ondo"
    ]
  }

  componentDidUpdate(prevProps, nextProps) {
    const { registration, edit } = this.props;
    if (this.props.registration && this.props.registration !== prevProps.registration) {
      if (this.props.registration.success === true) {
        this.setState({ 
          step: 1,
          name: "",
          email: "",
          phone: "",
          address: "",
          successMsg: "Upload success! Please select a picture to upload"
        });
      }
      if (registration.error && registration.error.length > 0) {
        this.setState({ errMessage: registration.error });
      }
      if (edit.success === true) {
        this.setState({ 
          sucMessage: "Photo uploaded successfully!",
          successMsg: ""
        });
      }
      if (edit.error && edit.error.length > 0) {
        this.setState({ errMessage: edit.error });
      }
    }
  }

  handleChange = (e, name) => {
    this.setState({ errMessage: "" });
    let field = this.state;
    if (name === "photo") {
      this.setState({
        photo: e.target.files[0],
        isPhoto: true,
      });
    }

    field[name] = e.target.value;
    this.setState({ field });
  }

  handleUpload = async () => {
    const { uploadProfilePhoto } = this.props;
    let formData = new FormData();
    formData.append("photo", this.state.photo);
    
    await uploadProfilePhoto(formData);
  }

  handleSubmit = async () => {
    const { registerBrandedCard } = this.props;
    const { name, email, phone, address, brand } = this.state;
    const data = { name, email, phone, address, brand };
    await registerBrandedCard(data);
  }

  render() {
    const { 
      name, 
      email,
      phone, 
      address, 
      brand, 
      brandlist, 
      photo, 
      step, 
      isPhoto, 
      errMessage, 
      successMsg,
      sucMessage
    } = this.state;
    const { registration, edit } = this.props;
    return(
      <div>
        <Header />
        <Particles
          params={particleOpt}
          style={{ background: "linear-gradient(to right, #0a7e07 0%, #0a7e07 100%)"}}
        />
        <Row className="justify-content-center">
          <Col xs="10" xl="6">
            <CardGroup className="reg-particle">
              <Card>
                {step === 0 ? <h4 className="text-center" style={{ marginTop: 30 }}>Upload your information</h4> :
                  <h4 className="text-center" style={{ marginTop: 30 }}>Upload your picture</h4>
                }
                <CardBody>
                  {errMessage.length > 0 ? <p style={{ color: "#ff0000" }}>{errMessage}</p> : null}
                  {successMsg.length > 0 ? <p style={{ color: "#00ff00" }}>{successMsg}</p> : null}
                  {sucMessage.length > 0 ? <p style={{ color: "#00ff00" }}>{sucMessage}</p> : null}
                  {step === 0 ? 
                  <CobrandForm
                    registration={registration}
                    name={name}
                    email={email}
                    phone={phone}
                    brand={brand}
                    brandlist={brandlist}
                    address={address}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                  /> : step === 1 ? 
                  <PhotoUpload
                    isPhoto={isPhoto}
                    handleChange={this.handleChange}
                    handleUpload={this.handleUpload}
                    photo={photo}
                    edit={edit}
                  /> : null}
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  }
}