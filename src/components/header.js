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
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  handleScroll = e => {
    console.log(window.scrollY);
    if (window.scrollY > 10) {
      this.setState(() => ({
        headerShrink: true
      }));
    } else {
      this.setState(() => ({
        headerShrink: false
      }));
    }
  };

  handleImageLoaded = () => {
    this.setState({ loaded: true });
  };

  handleClick = (country, name) => {
    if (this.props.handleClick) this.props.handleClick(country, name);
  };

  render() {
    const local = this.props.weather;
    return (
      <WeatherHeader headerShrink={this.state.headerShrink}>
        <Link to="/">
          <Logo headerShrink={this.state.headerShrink}>Weather</Logo>
        </Link>
        {local && (
          <Link
            onClick={this.handleClick.bind(this, local.country, local.name)}
            to={"/single/" + local.country + "/" + local.name}
          >
            <LocalWeather
              headerShrink={this.state.headerShrink}
              style={this.state.loaded ? {} : { display: "none" }}
            >
              <H3>{local.name}</H3>
              <Img
                onLoad={this.handleImageLoaded}
                src={"http://openweathermap.org/img/w/" + local.icon + ".png"}
              />
              <P>{local.temp}</P>
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
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  background: rgba(137, 82, 229, 1);
  transition: all 500ms ease;
  height: ${props => (props.headerShrink ? "60px" : "70px")};
  padding-top: ${props => (props.headerShrink ? "0" : "10px")};
  padding-bottom: 0;
`;
const Logo = styled.h1`
  font-family: "Parisienne", cursive;
  display: inline-block;
  border-radius: 6px;
  float: left;
  height: 40px;
  margin: 0;
  padding: 8px;
  margin-left: 4vw;
  transition: all 500ms ease;
  ${props => (props.headerShrink ? "transform: scale(0.8)" : "")};
  color: #fff;
  font-size: 40px;
  font-weight: 100;
`;
const LocalWeather = styled.div`
  position: relative;
  bottom: 8px;
  display: inline-block;
  float: right;
  font-family: "Open Sans", sans-serif;
  color: #fff;
  margin-right: 4vw;
  transition: all 500ms ease;
  ${props => (props.headerShrink ? "transform: scale(0.8)" : "")};
`;

const H3 = styled.h3`
  display: inline-block;
  font-size: 1em;
  font-weight: 300;
`;
const P = styled.p`
  margin: 0;
  padding: 2px 10px;
  border-radius: 50%;
  font-size: 1.7em;
  background: #fff;
  color: rgba(137, 82, 229, 1);
  display: inline-block;
  position: relative;
`;
const Img = styled.img`
  position: relative;
  top: 18px;
  margin: 0 14px;
`;
