import React from "react";
import styled from "styled-components";

export default props => (
  <Select
    disabled={!props.display}
    onChange={e => {
      if (e.target.value) {
        return e.target.value === "alphabet"
          ? props.sortByAlphabet()
          : e.target.value === "temperature" ? props.sortByTemperature() : "";
      }
    }}
  >
    <option value="">Sort</option>
    <option value="alphabet">Alphabetic</option>
    <option value="temperature">By Temperature</option>
  </Select>
);

const Select = styled.select`
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0px 2px 16px #ddd;
  border: 1px solid #079e41;
  border-radius: 3px;
  display: inline;
  overflow: hidden;
  max-width: 54px;
  position: relative;
  bottom: 52px;
  left: 10%;
  visibility: ${props => (props.disabled ? "hidden" : "default")};
  appearance: none;
  -webkit-appearance: none;
  border: none;
  font-size: 18px;
  padding: 0.25em 0.5em;
  width: 100px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #079e41;
  color: #079e41;
  outline: none;
  transition: transform 200ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;
