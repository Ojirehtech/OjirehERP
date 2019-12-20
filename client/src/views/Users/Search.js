import React, { Component } from "react";
import { 
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";

class Search extends Component{
  render() {
    const { handleSearch, handleKeyPress, handleInputChange, searchTerm } = this.props;
    return (
      <div className="search">
        <InputGroup>
          <Input
            placeholder="Search by phone number"
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
                background: "#20a8d8"
              }}
            >
              <i className="cil-zoom search-icon"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default Search;