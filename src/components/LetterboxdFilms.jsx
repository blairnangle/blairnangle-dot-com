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

const StyledFilmList = styled.ul`
  list-style: none;
`;

const StyledFilmItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 0.5em;
`;
const StyledArticleLink = styled(XA)``;

function LetterboxdFilms({ filmList }) {
  const heading = filmList.length === 0 ? '' : 'Twenty most recently watched films (via Letterboxd)';
  const films = filmList.length === 0 ? ''
    : filmList.map((content) => (
      <StyledFilmItem key={content.title}>
        <StyledArticleLink href={content.url}>
          {content.title}
          {' '}
          (
          {content.film_year}
          )
        </StyledArticleLink>
        <DateSpan>
          (watched on
          {' '}
          {content.date}
          )
        </DateSpan>
      </StyledFilmItem>
    ));

  return (
    <>
      <h3>{heading}</h3>
      <StyledFilmList>{films}</StyledFilmList>
    </>
  );
}

export default LetterboxdFilms;

LetterboxdFilms.propTypes = {
  filmList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    film_year: PropTypes.string.isRequired,
  })).isRequired,
};
