import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import XA from './ExternalAnchor';

const DateSpan = styled.span`
  display: none;
  color: #999;
  margin-left: 0.5em;

  @media (min-width: 520px) {
    display: inline;
  }
`;

const StyledBookListing = styled.ul`
  list-style: none;
`;

const StyledBookItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 0.5em;
`;
const StyledBookLink = styled(XA)``;

function GoodreadsBooks({ bookList }) {
  const heading = bookList.length === 0 ? '' : 'Twenty most recently read books (via Goodreads)';
  const postLinks = bookList.length === 0 ? ''
    : bookList.map((content) => (
      <StyledBookItem key={content.title}>
        <StyledBookLink href={content.url}>
          {content.title}
          {content.author !== '' ? ` by ${content.author}` : ''}
        </StyledBookLink>
        <DateSpan>
          (finished on
          {' '}
          {content.finished}
          )
        </DateSpan>
      </StyledBookItem>
    ));

  return (
    <>
      <h3>{heading}</h3>
      <StyledBookListing>{postLinks}</StyledBookListing>
    </>
  );
}

export default GoodreadsBooks;

GoodreadsBooks.propTypes = {
  bookList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    finished: PropTypes.string.isRequired,
  })).isRequired,
};
