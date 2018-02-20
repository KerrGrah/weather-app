import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import Button from "./button";

export default class Pagination extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.page !== nextProps.page ||
      this.props.displaySaved !== nextProps.displaySaved
    );
  }
  render() {
    const Container = styled.div`
      text-align: center;
      animation: ${fadeIn} 1s linear;
      font-size: 1.2rem;
    `;

    return (
      <Container>
        <Button
          type="button"
          value="prev"
          disabled={this.props.firstPage}
          onClick={this.props.changePage.bind(this, -1)}
          className="pagination_prev-button"
        />
        <Button
          type="button"
          value="next"
          disabled={this.props.lastPage}
          onClick={this.props.changePage.bind(this, 1)}
          className="pagination_next-button"
        />
      </Container>
    );
  }
}

const fadeIn = keyframes`
0% {
  opacity: 0;
}
80% {
  opacity: 0;
}
100% {
  opacity: 1;
}
 `;
