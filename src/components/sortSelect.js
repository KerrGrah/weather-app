import React from "react";
import styled from "styled-components";

export default props => (
  <Select
    onChange={e => {
      if (e.target.value) {
        return e.target.value === "alphabet"
          ? props.sortByAlphabet()
          : props.sortByTemperature();
      }
    }}
  >
    <option value="" />
    <option value="alphabet">Alphabetic</option>
    <option value="temperature">By Temperature</option>
  </Select>
);

const Select = styled.select``;
