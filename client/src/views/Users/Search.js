import React, { Component } from "react";
import { 
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";

class Search extends Component{
  render() {
    const { handleSearch, handleKeyPress, handleInputChange, searchTerm } = this.props;
    return (
      <div>
        <InputGroup>
          <Input
            placeholder="Type full name to search"
            value={searchTerm}
            onChange={( e ) => handleInputChange( e, "searchTerm" )}
            onKeyPress={(e) => handleKeyPress(e)}
            style={{
              border: "none",
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              height: "100%",
              padding: 15
            }}
          />
          <InputGroupAddon
            addonType="append"
          >
            <Button
              onClick={() => handleSearch()}
              color="secondary"
              style={{
                height: "100%",
                width: "80px",
                borderBottomRightRadius: 26,
                borderTopRightRadius: 26,
                background: "blue"
              }}
            >
              <i className="cil-zoom"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default Search;