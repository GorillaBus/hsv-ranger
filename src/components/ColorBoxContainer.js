import React, { Component } from 'react';
import '../css/ColorBoxContainer.css';

class ColorBoxContainer extends Component {
  constructor(props,context) {
    super(props);
  }
  render() {
    let maxHueStyle = {
      backgroundColor: "rgba("+ this.props.maxHue[0] +","+ this.props.maxHue[1] +","+ this.props.maxHue[2] +",1)",
    };
    let minHueStyle = {
      backgroundColor: "rgba("+ this.props.minHue[0] +","+ this.props.minHue[1] +","+ this.props.minHue[2] +",1)",
    };
    let midHueStyle = {
      backgroundColor: "rgba("+ this.props.midHue[0] +","+ this.props.midHue[1] +","+ this.props.midHue[2] +",1)",
    };
    let maxValStyle = {
      backgroundColor: "rgba(0,0,0,"+ parseFloat(this.props.maxVal) +")",
    };
    let minValStyle = {
      backgroundColor: "rgba(0,0,0,"+ parseFloat(this.props.minVal) +")",
    };

    return(
      <div className="colorBoxContainer">
        <div
          className = "colorBox"
          style={maxHueStyle}>
          <p>Max Hue Color</p>
        </div>

        <div
          className = "colorBox"
          style={midHueStyle}>
          <p>Mid Hue Color</p>
        </div>

        <div
          className = "colorBox"
          style={minHueStyle}>
          <p>Min Hue Color</p>
        </div>

        <div
          className = "colorBox"
          style={maxValStyle}>
          <p>Max Val</p>
        </div>

        <div
          className = "colorBox"
          style={minValStyle}>
          <p>Min Val</p>
        </div>

        <div className="clear"></div>
      </div>
    )
  }
}

export default ColorBoxContainer;
