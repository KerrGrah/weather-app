import React from "react";
import styled from "styled-components";

export default props => (
  <SelectContainer>
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
      <option value="alphabet">A-Z</option>
      <option value="temperature">°C</option>
    </Select>
  </SelectContainer>
);
const SelectContainer = styled.div`
  position: relative;
  height: 0;
`;

const Select = styled.select`
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0px 0px 12px #ddd;
  border: 1px solid #079e41;
  border-radius: 3px;
  display: inline-block;
  max-width: 54px;
  overflow: hidden;
  position: absolute;
  bottom: 20px;
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
  border: none;
  color: #00691d;
  outline: none;
  transition: all 200ms ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 16px #ddd;
  }
  &:focus {
    outline: none;
  }
`;
