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

const StyledArticleList = styled.ul`
  list-style: none;
`;

const StyledArticleItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 0.5em;
`;
const StyledArticleLink = styled(XA)``;

function PocketArticles({ articleList }) {
  const heading = articleList.length === 0 ? '' : 'Twenty most recently read articles (via Pocket)';
  const articles = articleList.length === 0 ? ''
    : articleList.map((content) => (
      <StyledArticleItem key={content.title}>
        <StyledArticleLink href={content.url}>
          {content.title}
          {content.authors !== '' ? ` by ${content.authors}` : ''}
        </StyledArticleLink>
        <DateSpan>
          (read on
          {' '}
          {content.date_read}
          )
        </DateSpan>
      </StyledArticleItem>
    ));

  return (
    <>
      <h3>{heading}</h3>
      <StyledArticleList>{articles}</StyledArticleList>
    </>
  );
}

export default PocketArticles;

PocketArticles.propTypes = {
  articleList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date_read: PropTypes.string.isRequired,
  })).isRequired,
};
