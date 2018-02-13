import React, { Component } from "react";
import styled from "styled-components";
import WeatherBrief from "./weatherBrief";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentWillMount() {
    this.props.dispatch({ type: "GET_USER_LOCATION" });
  }

  handleImageLoaded = () => {
    this.setState({ loaded: true });
  };

  handleClick = (country, name) => {
    if (this.props.handleClick) this.props.handleClick(country, name);
  };

  render() {
    const local = this.props.weather;
    return (
      <WeatherHeader>
        <Link to="/">
          <Logo>Weather</Logo>
        </Link>
        {local && (
          <Link
            onClick={this.handleClick.bind(this, local.country, local.name)}
            to={"/single/" + local.country + "/" + local.name}
          >
            <LocalWeather style={this.state.loaded ? {} : { display: "none" }}>
              <H3>{local.name}</H3>
              <ImageTempContainer>
                <Img
                  onLoad={this.handleImageLoaded}
                  src={"http://openweathermap.org/img/w/" + local.icon + ".png"}
                />
                <P>{local.temp}</P>
              </ImageTempContainer>
            </LocalWeather>
          </Link>
        )}
      </WeatherHeader>
    );
  }
}

const mapStateToProps = store => {
  return {
    weather: store.weather.weatherLocal
  };
};

export default connect(mapStateToProps)(Header);

const WeatherHeader = styled.header`
  top: 0;
  width: 100%;
  background: rgba(135, 206, 250, 0.4);
  height: 80px;
`;
const Logo = styled.h1`
  @import url("https://fonts.googleapis.com/css?family=Archivo+Narrow|Noto+Sans");
  font-family: "Archivo Narrow", sans-serif;
  display: inline-block;
  border-radius: 6px;
  float: left;
  height: 40px;
  margin: 0;
  margin-left: 4vw;
  margin-top: 10px;
  background: #fff;
  color: #022873;
  font-size: 40px;
  font-weight: 100;
  padding: 10px;
`;
const LocalWeather = styled.div`
  display: inline-block;
  float: right;
  margin-top: 10px;
  margin-right: 4vw;
`;
const ImageTempContainer = styled.div`
  display: block;
`;
const H3 = styled.div`
  margin: 0;
  padding: 0;
`;
const P = styled.p`
  margin: 0;
  padding: 0 20px;
  font-size: 2em;
  display: inline-block;
  position: relative;
  bottom: 16px;
`;
const Img = styled.img``;
