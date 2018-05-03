import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class ValueSlider extends Component {
  constructor(props, context) {
    super(props, context);

    if (!props.hasOwnProperty("id")) {
      console.warn("ValueSlider required an ID");
    }

    this.title = props.title || "untitled";
    this.id = props.id || "noId";

    this.handleOnComplete = this.handleOnComplete.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.format = this.format.bind(this);
  }

  render() {
    return (
      <div className="sliderBox">
        <p>{this.title}</p>
        <Slider
          value={this.props.value}
          min={this.props.min || 0}
          max={this.props.max || 255}
          step={1}
          orientation="vertical"
          onChange={this.handleOnChange}
          onChangeComplete={this.handleOnComplete}
        />
        <div className="display">{this.props.value}</div>
      </div>
    )
  }

  handleOnComplete() {
    this.props.onComplete();
  }

  handleOnChange(value) {
    this.props.onUpdate(this.id, value);
  }

  format(n) {
    return Math.round(n * 100) / 100;
  }
}

export default ValueSlider;
