import React, { Component } from "react";
import bemCn from "bem-cn-fast";
import styled from "styled-components";

export default class ComboBox extends Component {
  render() {
    const matchingCities = this.props.matchingCities.map((city, i) => (
      <a href={"/single/" + city[1] + "/" + city[0]}>
        <Li
          className="matching-dropdown_city"
          onClick={this.props.getWeatherOne.bind(this, city)}
          key={city[0] + city[1] + i}
        >
          {city[0] + " " + city[1]}
        </Li>
      </a>
    ));

    return (
      <ComboContainer key="search">
        <Input
          key="search-input"
          value={this.props.value}
          placeholder="search"
          type="search"
          onChange={this.props.handleInputChange.bind(this)}
        />
        <Dropdown>{matchingCities}</Dropdown>
      </ComboContainer>
    );
  }
}

const ComboContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 86%;
  padding: 20px;
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
  }
`;
const Dropdown = styled.div`
  width: 100%;
  max-height: 60vh;
  background: #fff;
  position: absolute;
  overflow-y: scroll;
`;
const Li = styled.div`
  cursor: pointer;
  padding: 10px;
  width: 90%;
  &:hover {
    background: #eee;
  }
`;
