import React, { PureComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import starEmpty from "../assets/star-empty";
import starFilled from "../assets/star-filled";

export default class WeatherBrief extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  handleImageLoaded = () => {
    this.setState({ loaded: true });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.handleSave(this.props.weather);
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.handleDelete(this.props.weather);
  };

  handleClick = () => {
    this.props.history.push(
      "/single/" + this.props.weather.country + "/" + this.props.weather.name
    );
  };

  render() {
    if (this.props.weather.error) {
      return (
        <Wrapper>
          <h3>{this.props.weather.name}</h3>
          <p>{`Apparently no weather in ${this.props.weather.name}`}</p>
        </Wrapper>
      );
    }

    const {
      country,
      temp,
      name,
      description,
      icon,
      main,
      id
    } = this.props.weather;

    return (
      <Wrapper
        onClick={this.handleClick}
        style={this.state.loaded ? {} : { display: "none" }}
      >
        <h3>{name}</h3>
        <p>{temp} °C</p>
        <div className="img-container">
          <img
            onLoad={this.handleImageLoaded}
            src={`http://openweathermap.org/img/w/${icon}.png`}
          />
        </div>
        {this.props.savedIds.indexOf(id) < 0 ? (
          <Star onClick={this.handleSave.bind(name)}>
            {starEmpty("save-empty")}
          </Star>
        ) : (
          <Star onClick={this.handleDelete.bind(name)}>
            {starFilled("save-filled")}
          </Star>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  background: rgba(217, 230, 255, 0.3);
  box-shadow: 0px 1px 10px #eee;
  margin: 10px auto;
  padding: 10px;
  color: #00691d;
  transition: transform 400ms ease;
  cursor: pointer;
  & h3 {
    flex: 1;
    font-size: 1.3em;
    font-weight: 300;
  }
  & p {
    flex: 1;
    font-size: 1.2em;
    font-weight: 400;
    padding: 10px;
  }
  &:hover {
    transform: scale(1.02);
  }
`;
const Star = styled.div`
  padding: 0 10px 0 20px;
`;
