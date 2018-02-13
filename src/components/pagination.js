import React, { Component } from "react";
import styled from "styled-components";

export default class Pagination extends Component {
  render() {
    return (
      <Container className="pagination">
        <button
          disabled={this.props.firstPage}
          onClick={this.props.changePage.bind(this, -1)}
          className="pagination_prev-button"
        >
          prev
        </button>
        <button
          disabled={this.props.lastPage}
          onClick={this.props.changePage.bind(this, 1)}
          className="pagination_next-button"
        >
          next
        </button>
      </Container>
    );
  }
}
const Container = styled.div`
  text-align: center;
`;
