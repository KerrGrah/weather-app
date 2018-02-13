import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import starEmpty from "../assets/star-empty";
import starFilled from "../assets/star-filled";

export default class WeatherBrief extends Component {
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
      <Link to={"/single/" + country + "/" + name}>
        <Wrapper style={this.state.loaded ? {} : { display: "none" }}>
          <h3>{name}</h3>
          <p>{temp} °C</p>
          <div className="img-container">
            <img
              onLoad={this.handleImageLoaded}
              src={"http://openweathermap.org/img/w/" + icon + ".png"}
            />
          </div>
          {this.props.savedIds.indexOf(id) < 0 ? (
            <div onClick={this.handleSave.bind(name)}> {starEmpty()}</div>
          ) : (
            <div onClick={this.handleDelete.bind(name)}> {starFilled()}</div>
          )}
        </Wrapper>
      </Link>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  width: 80%;
  background: rgba(135, 206, 250, 0.2);
  margin: 10px auto;
  padding: 10px;
  & h3 {
    flex: 1;
  }
  & p {
    flex: 1;
  }
  & .img-container {
  }
`;
