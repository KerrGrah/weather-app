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
  shouldComponentUpdate(nextProps) {
    return !!nextProps.weather.id;
  }

  render() {
    console.log(this.props);

    if (!this.props.weather.main) {
      return "";
    }
    if (!this.props.fetched) return <Spinner />;

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
        <div> {weather.name}</div>
        <div> {weather.description}</div>
        <div> {weather.temp} </div>
      </Container>
    );
  }
}
const Container = styled.div``;

const mapStateToProps = store => {
  return {
    weather: store.weather.singleWeather,
    fetched: store.weather.fetched
  };
};

export default connect(mapStateToProps)(Single);
