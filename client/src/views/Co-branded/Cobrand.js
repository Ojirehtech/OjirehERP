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
          successMsg: "Upload success! Please click next to upload your picture"
        });
      }
      if (registration.error && registration.error.length > 0) {
        this.setState({ errMessage: registration.error });
      }
      if (edit.success === true) {
        this.setState({ successMsg: "Photo uploaded successfully!" });
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
    const { uploadProfileUpload } = this.props;
    let formData = new FormData();
    formData.append("file", this.state.photo);
    
    await uploadProfileUpload(formData);
  }

  handleSubmit = async () => {
    const { registerBrandedCard } = this.props;
    const { name, email, phone, address } = this.state;
    const data = { name, email, phone, address };
    await registerBrandedCard(data);
  }

  render() {
    const { name, email, phone, address, brand, brandlist, step, isPhoto } = this.state;
    const { registration } = this.props;
    
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
                <h4 className="text-center" style={{ marginTop: 30 }}>Upload your information</h4>
                <p style={{ paddingLeft: 30, color: "green" }}>You must upload your photo first before you can continue</p>
                <CardBody>
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
                  /> : null}
                  {registration.success === true ? <Button color="success">CLICK TO CONTINUE TO NEXT</Button> : null}
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  }
}