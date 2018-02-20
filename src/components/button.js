import React from "react";
import styled from "styled-components";

export default props => <Button {...props} />;

const Button = styled.input`
  margin: 20px;
  padding: 0.25em 0.5em;
  font-size: 18px;
  cursor: ${props => (props.disabled || props.active ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "0.4" : "1")};
  background: ${props => (props.active ? "#00691D" : "#fff")};
  color: ${props => (props.active ? "#fff" : "#00691D")};
  box-shadow: ${props =>
    props.disabled || props.active
      ? "0px 0px 10px #ddd"
      : "0px 0px 16px  #ddd"};
  border: none;
  border-radius: 1px;
  transition: all 200ms ease-in-out;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: ${props =>
      !props.disabled && !props.active ? "scale(1.05)" : ""};
    box-shadow: ${props =>
      props.disabled || props.active
        ? "0px 0px 10px #ddd"
        : "0px 2px 20px  #ddd"};
  }
`;
