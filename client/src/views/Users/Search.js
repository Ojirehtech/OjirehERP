import React, { Component } from "react";
import { 
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
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

          />
          <InputGroupAddon addonType="prepend">
            <InputGroupText
              onClick={()=> handleSearch()}
            ><i className="cil-zoom"></i></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default Search;