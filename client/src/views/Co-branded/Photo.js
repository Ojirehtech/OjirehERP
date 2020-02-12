import React from "react";
import { 
  Row, 
  Button, 
  Col, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Spinner, 
  Card, 
  CardGroup, 
  CardBody 
} from "reactstrap";

const PhotoUpload = ({isPhoto, handleChange, handleUpload, uploadPhoto }) => {
  return (
    <Col xs="12" sm="10" xl="12">
      <InputGroup className="mb-3">
        <div className="custom-file">
          <input 
            type="file" 
            className="custom-file-input" 
            id="customFile"
            onChange={(e) => handleChange(e, "photo")}
            accept="image/*"
          />
          <label className="custom-file-label" for="customFile">Choose file</label>
        </div>
      </InputGroup>
      { isPhoto === true ? 
      ( <>
        <p style={{ background: "lightgreen", padding: 5 }}>{this.state.photo.name}</p>
        <Button color="success" onClick={() => handleUpload() } style={{ marginBottom: 10 }}>Upload photo</Button>
        </>
        ) : null
      }
    </Col>
  )
}

export default PhotoUpload;