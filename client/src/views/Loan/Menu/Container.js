import React, { Component } from "react";
import Payloan from "./Payloan";
import ActionForm from "./ActionForm";
import OfferPage from "./OfferPage";

class Container extends Component{
  state = {
    action: ""
  }

  handleChange = ( e ) => {
    this.setState( {
      action: e.target.value
    } );
    console.log(e.target.value)
  }

  renderView = () => {
    const { action} = this.state;
    switch (action) {
      case "pay":
        return <Payloan />
      case "offer":
        return <OfferPage />
      default:
        return <ActionForm handleChange={this.handleChange} />;
    }
  }
  render() {
    return (
      <div>
       {this.renderView()}
      </div>
    );
  }
}

export default Container;