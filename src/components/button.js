import React from "react";
import styled from "styled-components";

export default props => <Button {...props} />;

const Button = styled.input`
  margin: 20px;
  padding: 0.25em 0.5em;
  font-size: 18px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "0.4" : "1")};
  background: ${props => (props.active ? "#079E41" : "#fff")};
  color: ${props => (props.active ? "#fff" : "#079E41")};
  box-shadow: ${props =>
    props.disabled || props.active
      ? "0px 1px 10px #ddd"
      : "0px 2px 16px  #ddd"};
  border: 1px solid #079e41;
  border-radius: 3px;
  transition: transform 200ms ease-in-out;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: ${props =>
      !props.disabled && !props.active ? "scale(1.05)" : ""};
  }
`;
