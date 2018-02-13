import React from "react";
import styled from "styled-components";

export default props => (
  <DisplayButtons>
    <p
      className="saved-weather"
      onClick={props.showSaved}
      onMouseDown={props.pageChange}
    >
      saved
    </p>
    <p
      className="random-weather"
      onClick={props.showRandom}
      onMouseDown={props.pageChange}
    >
      random
    </p>
  </DisplayButtons>
);

const DisplayButtons = styled.div`
  text-align: center;
  > p {
    display: inline;

    padding: 20px;
  }
`;
