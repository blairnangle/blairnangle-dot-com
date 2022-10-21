import React from 'react';
import XA from '../components/ExternalAnchor';
import Layout from '../components/Layout';

const elsewhere = () => (
  <Layout>
    <div>
      <p>
        •
        {' '}
        <XA href="https://exercism.org/profiles/blairnangle">Exercism</XA>
      </p>
      <p>
        •
        {' '}
        <XA href="https://github.com/blairnangle">GitHub</XA>
      </p>
      <p>
        •
        {' '}
        <XA href="https://www.goodreads.com/user/show/74431442-blair-nangle">Goodreads</XA>
      </p>
      <p>
        •
        {' '}
        <XA href="https://www.kaggle.com/blairnangle">Kaggle</XA>
      </p>
      <p>
        •
        {' '}
        <XA href="https://keybase.io/blairnangle">Keybase</XA>
      </p>
      <p>
        •
        {' '}
        <XA href="https://linkedin.com/in/blairnangle/">LinkedIn</XA>
      </p>
      <p>
        •
        {' '}
        <XA href="https://stackoverflow.com/users/4304123/blair-nangle">Stack Overflow</XA>
      </p>
      <p>
        •
        {' '}
        <XA href="https://twitter.com/blairnangle">Twitter</XA>
      </p>
    </div>
  </Layout>
);

export default elsewhere;
