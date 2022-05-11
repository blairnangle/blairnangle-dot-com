import React from 'react';
import XA from '../components/ExternalAnchor';
import Layout from '../components/Layout';

const contact = () => (
  <Layout>
    <div>
      <p>
        <XA href="mailto:hi@blairnangle.com">Email</XA>
        {' '}
        or
        {' '}
        <XA href="https://twitter.com/blairnangle">tweet</XA>
        {' '}
        me.
      </p>
    </div>
  </Layout>
);

export default contact;
