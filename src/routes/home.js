import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Spinner from "../components/spinner";
import DisplayButtons from "../components/displayButtons";
import SortSelect from "../components/sortSelect";
import {
  changePage,
  handleSave,
  handleDelete,
  USER_INPUT_EMPTY,
  GET_SAVED_WEATHER,
  GET_USER_LOCATION,
  GET_WEATHER_FIVE,
  SORT_BY_TEMPERATURE,
  SORT_BY_ALPHABET
} from "../actions";
import Pagination from "../components/pagination";
import WeatherBrief from "../components/weatherBrief";
import ComboBox from "../components/comboBox";
import Header from "../components/header";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySaved: true
    };
  }
  componentWillMount() {
    this.props.dispatch({ type: GET_USER_LOCATION });
    this.props.dispatch({ type: GET_SAVED_WEATHER });
    this.props.dispatch({ type: USER_INPUT_EMPTY });
  }

  handlePageChange = change => {
    if (
      !this.state.displaySaved &&
      (this.props.weather.currentPage + 1 + change) * 5 >=
        this.props.weather.randomWeather.length
    ) {
      this.props.dispatch({ type: GET_WEATHER_FIVE });
    }
    this.props.dispatch(changePage(change));
  };

  render() {
    console.log(this.props);

    const weatherData = this.state.displaySaved
      ? this.props.weather.savedWeather
      : this.props.weather.randomWeather;

    const page = this.props.weather.currentPage;
    const weatherBriefs = weatherData
      .slice(page * 5, page * 5 + 5)
      .map((city, i) => {
        return (
          <WeatherBrief
            key={city + i}
            weather={city}
            savedIds={this.props.weather.savedIds}
            handleSave={city => this.props.dispatch(handleSave(city))}
            handleDelete={city => this.props.dispatch(handleDelete(city))}
          />
        );
      });
    if (!this.props.weather.fetched)
      return (
        <Container>
          <Header />
          <Spinner />
        </Container>
      );
    return (
      <Container>
        <Header />
        <ComboBox history={this.props.history} />
        <DisplayButtons
          showSaved={() => this.setState({ displaySaved: true })}
          showRandom={() => this.setState({ displaySaved: false })}
          pageChange={() => this.props.dispatch(changePage(-9999))}
          displaySaved={this.state.displaySaved}
        />
        <SortSelect
          display={this.state.displaySaved}
          sortByAlphabet={() => this.props.dispatch({ type: SORT_BY_ALPHABET })}
          sortByTemperature={() =>
            this.props.dispatch({ type: SORT_BY_TEMPERATURE })
          }
        />
        <BriefsContainer>{weatherBriefs}</BriefsContainer>
        <Pagination
          page={page}
          firstPage={page === 0}
          lastPage={
            (this.state.displaySaved && (page + 1) * 5 >= weatherData.length) ||
            (!this.state.displaySaved && page === this.props.weather.pages)
          }
          changePage={this.handlePageChange}
        />
      </Container>
    );
  }
}
const Container = styled.div``;
const TopControls = styled.div``;
const BriefsContainer = styled.div``;

const mapStateToProps = store => {
  return {
    ...store
  };
};

export default connect(mapStateToProps)(Home);
