import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { userInputChange, USER_INPUT_EMPTY } from "../actions";

class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      listVisible: false,
      inFocus: 0,
      selected: [],
      scrollTop: 0
    };
  }

  handleKey = e => {
    switch (e.keyCode) {
      // enter-key
      case 13:
        this.handleSelection();
        break;
      // up-key
      case 38:
        e.preventDefault();
        // limit to zero
        const inFocus = this.state.inFocus ? this.state.inFocus - 1 : 0;
        console.log(this.state);

        this.setState(() => ({
          inFocus: inFocus,
          scrollTop: inFocus * 34 - 68
        }));
        break;
      // down-key
      case 40:
        e.preventDefault();
        // limit to max of list
        const maxIndex = this.props.matchingCities.length - 1;
        if (this.state.inFocus < maxIndex) {
          this.setState(state => ({
            inFocus: state.inFocus + 1,
            scrollTop: (state.inFocus + 1) * 34 - 68
          }));
        }
    }
  };
  componentDidUpdate() {
    const listContainer = document.getElementById("drop-down");
    if (listContainer) listContainer.scrollTop = this.state.scrollTop;
  }

  handleSelection = (country, city) => {
    const selected =
      country && city
        ? [city, country]
        : this.props.matchingCities[this.state.inFocus]
          ? this.props.matchingCities[this.state.inFocus]
          : ["that city", "any country"];

    this.setState(
      () => ({
        focus: false,
        listVisible: false,
        inFocus: 0,
        selected: "",
        scrollTop: 0
      }),
      () => {
        this.props.history.push("/single/" + selected[1] + "/" + selected[0]);
      }
    );
  };
  handleInputChange = e => {
    if (e.target.value) {
      this.props.dispatch(userInputChange(e.target.value));
    } else {
      this.props.dispatch({ type: USER_INPUT_EMPTY });
    }
  };

  handleFocus = () => {
    this.setState({
      listVisible: true
    });
  };

  handleBlur = () => {
    this.setState(state => ({
      listVisible: false
    }));
  };

  render() {
    console.log(this.props);

    const matchingCities = this.props.matchingCities.map((el, i) => {
      const country = el[1];
      const city = el[0];

      return (
        <Li
          onMouseDown={this.handleSelection.bind(null, country, city)}
          index={i}
          inFocus={this.state.inFocus}
          key={city + country + i}
        >
          {city + " " + country}
        </Li>
      );
    });

    return (
      <ComboContainer key="search">
        <Input
          onKeyDown={this.handleKey}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          key="search-input"
          value={this.props.value}
          placeholder="search"
          type="search"
          onChange={this.handleInputChange.bind(this)}
        />
        <Dropdown
          listVisible={this.state.listVisible}
          visible={this.state.listVisible}
          id="drop-down"
        >
          {matchingCities}
        </Dropdown>
      </ComboContainer>
    );
  }
}
const mapStateToProps = store => {
  return {
    matchingCities: store.user.matchingCities
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //updateImage: () => dispatch(updateImageAction()),
    dispatch
  };
};
export default connect(mapStateToProps)(ComboBox);

const ComboContainer = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
  width: 80%;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 3em;
  padding: 0em 1em;
  font-size: 16px;
  color: #111;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border 500ms ease;
  &:focus {
    outline: none;
    border: 2px solid #ccc;
    border-radius: 2px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);
  max-height: ${props => (props.listVisible ? "50vh" : "0")};
  overflow: scroll;
  transition: height 1000ms ease-in-out;
`;

const Li = styled.div`
  background: ${props => (props.index === props.inFocus ? "#ddd" : "#fff")};
  padding: 0.5em;
  &:hover {
    background: #ddd;
  }
`;
