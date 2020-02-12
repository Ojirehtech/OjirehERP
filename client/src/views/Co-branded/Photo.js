import React from "react";
import { 
  Button, 
  Col,
  InputGroup, 
  Spinner, 
} from "reactstrap";

const PhotoUpload = ({ isPhoto, handleChange, handleUpload, photo, edit }) => {
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
          {edit.success === true ? null :  <p style={{ background: "lightgreen", padding: 5 }}>{photo.name}</p>}
          {edit.loading === true ? <Spinner color="primary" /> : (
            <Button color="success" onClick={() => handleUpload() } style={{ marginBottom: 10 }}>Upload photo</Button>
          )}
        </>
        ) : null
      }
    </Col>
  )
}

export default PhotoUpload;