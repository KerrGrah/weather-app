import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getWeatherOne } from "../actions";
import Header from "../components/header";
import Spinner from "../components/spinner";

class Single extends Component {
  componentWillMount() {
    const { country, city } = this.props.match.params;
    this.props.dispatch(getWeatherOne(country, city));
  }
  // shouldComponentUpdate(nextProps) {
  //    return !!nextProps.weather.id;
  // }
  parseTimestamp = timestamp => {
    const time = new Date(timestamp * 1000);
    console.log(typeof time.getHours(), "\n\n\n\n\n\n");

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  render() {
    console.log(this.props);

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
    console.log(weather);

    return (
      <Container>
        <Header
          handleClick={(country, city) =>
            this.props.dispatch(getWeatherOne(country, city))
          }
        />
        <CityName> {weather.name} </CityName>
        <div> {weather.description} </div>
        <div>temperature: {weather.temp} </div>
        <div>humidity: {weather.humidity} </div>
        <div>pressure: {weather.pressure} </div>
        <div>sunrise at: {this.parseTimestamp(weather.sunrise)} </div>
        <div>sunset at: {this.parseTimestamp(weather.sunset)} </div>
      </Container>
    );
  }
}
const Container = styled.div`
  text-align: center;
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
