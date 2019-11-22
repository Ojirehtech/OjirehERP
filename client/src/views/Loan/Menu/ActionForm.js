import React, { Component } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  InputGroup,
  Form,
  Label,
} from "reactstrap"


class ActionForm extends Component {
  state = {
    action: ""
  }

  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <Card style={{ height: "500px" }}>
          <CardBody>
            <Row className="justify-content-md-center">
              <Col xs="4">
                <h3>Hello from Menu</h3>
                <p className="text-muted">Please select an option to continue</p>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs="10" xl="3">
                <Form>
                  <InputGroup className="mb-3">
                    <Label htmlFor="offer" className="text-muted">
                      Check Loan offer
                    </Label>
                    <Input
                      type="radio"
                      id="offer"
                      value="offer"
                      checked={this.props.action === "offer"}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Label htmlFor="pay" className="text-muted">
                      Pay loan
                    </Label>
                    <Input
                      type="radio"
                      id="pay"
                      value="pay"
                      checked={this.props.action === "pay"}
                      onChange={handleChange} />
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default ActionForm;