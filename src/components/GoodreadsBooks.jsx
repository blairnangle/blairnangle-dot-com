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

const StyledBookList = styled.ul`
  list-style: none;
`;

const StyledBookItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 0.5em;
`;
const StyledBookLink = styled(XA)``;

function chooseHeading(bookList, shelf) {
  if (bookList.length === 0) {
    return '';
  }
  if (shelf === 'currentlyReading') {
    return 'Books I\'m currently reading (via Goodreads)';
  }

  return 'Twenty most recently read books (via Goodreads)';
}

function chooseDateSentence(content, shelf) {
  if (shelf === 'currentlyReading') {
    return `(started on ${content.started})`;
  }

  return `(finished on ${content.finished})`;
}

function GoodreadsBooks({ bookList, shelf }) {
  const heading = chooseHeading(bookList, shelf);
  const books = bookList.length === 0 ? ''
    : bookList.map((content) => (
      <StyledBookItem key={content.title}>
        <StyledBookLink href={content.url}>
          {content.title}
          {content.author !== '' ? ` by ${content.author}` : ''}
        </StyledBookLink>
        <DateSpan>
          {chooseDateSentence(content, shelf)}
        </DateSpan>
      </StyledBookItem>
    ));

  return (
    <>
      <h3>{heading}</h3>
      <StyledBookList>{books}</StyledBookList>
    </>
  );
}

export default GoodreadsBooks;

GoodreadsBooks.propTypes = {
  bookList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    finished: PropTypes.string,
    started: PropTypes.string,
  })).isRequired,
  shelf: PropTypes.string.isRequired,
};
