import React from 'react';
import XA from '../components/ExternalAnchor';
import Layout from '../components/Layout';

const about = () => (
  <Layout>
    <div>
      <p>
        I write software at
        {' '}
        <XA href="https://kevel.com/">Kevel</XA>
        .
      </p>
    </div>
  </Layout>
);

export default about;
