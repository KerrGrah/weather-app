import React from "react";
import styled from "styled-components";
import Button from "./button";

export default props => (
  <DisplayButtons>
    <Button
      value="Saved"
      type="button"
      active={props.displaySaved}
      onClick={props.showSaved}
      onMouseDown={props.pageChange}
    />
    <Button
      value="Random"
      type="button"
      active={!props.displaySaved}
      onClick={props.showRandom}
      onMouseDown={props.pageChange}
    />
  </DisplayButtons>
);

const DisplayButtons = styled.div`
  text-align: center;
`;
