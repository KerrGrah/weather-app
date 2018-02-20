import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getWeatherOne } from "../actions";
import Header from "../components/header";
import Spinner from "../components/spinner";

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentWillMount() {
    const { country, city } = this.props.match.params;
    this.props.dispatch(getWeatherOne(country, city));
  }
  // shouldComponentUpdate(nextProps) {
  //    return !!nextProps.weather.id;
  // }

  handleImageLoaded = () => {
    this.setState({ loaded: true });
  };
  parseTimestamp = timestamp => {
    const time = new Date(timestamp * 1000);
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  render() {
    if (this.props.error) {
      const { country, city } = this.props.match.params;
      return (
        <Container>
          <Header
            handleClick={(country, city) =>
              this.props.dispatch(getWeatherOne(country, city))
            }
          />
          <ErrorMsgg>
            {`There would appear to be no weather available for ${city} in ${country}.`}
          </ErrorMsgg>
        </Container>
      );
    }

    if (!this.props.fetched || !this.props.weather.main) return <Spinner />;

    const weather = {
      ...this.props.weather.sys,
      ...this.props.weather.main,
      ...this.props.weather.weather[0],
      name: this.props.weather.name
    };
    return (
      <Container>
        <Header
          handleClick={(country, city) =>
            this.props.dispatch(getWeatherOne(country, city))
          }
        />
        <Section style={this.state.loaded ? {} : { display: "none" }}>
          <img
            onLoad={this.handleImageLoaded}
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
          />
          <CityName> {weather.name} </CityName>
          <p> {weather.description} </p>
          <p>
            temperature: <span> {weather.temp} </span>
          </p>
          <p>
            humidity: <span> {weather.humidity} </span>
          </p>
          <p>
            pressure: <span> {weather.pressure} </span>
          </p>
          <p>
            sunrise at: <span> {this.parseTimestamp(weather.sunrise)} </span>
          </p>
          <p>
            sunset at: <span> {this.parseTimestamp(weather.sunset)} </span>
          </p>
        </Section>
      </Container>
    );
  }
}

const Container = styled.div`
  padding-top: 80px;
`;

const Section = styled.section`
  margin: 0 auto;
  margin-top: 10vh;
  padding: 20px;
  width: 50%;
  font-family: "Open Sans", sans-serif;
  text-align: center;
  background: rgba(135, 206, 250, 0.1);
  box-shadow: 0px 1px 18px #ddd;
  border-radius: 4px;
  & > h2 {
    margin: 0;
    font-weight: 300;
  }
  & > img {
    width: 20%;
    display: block;
    margin: 0 auto;
  }
  & > p {
    margin: 10px;
    font-weight: 300;
    &:first-of-type {
      margin-top: 20px;
    }
    & > span {
      font-weight: 600;
    }
  }
`;
const CityName = styled.h2``;
const ErrorMsgg = styled.p``;

const mapStateToProps = store => {
  return {
    weather: store.weatherOne.singleWeather,
    error: store.weatherOne.error,
    fetched: store.weatherOne.fetched
  };
};

export default connect(mapStateToProps)(Single);
