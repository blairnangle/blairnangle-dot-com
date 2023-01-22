import React from 'react';
import XA from '../components/ExternalAnchor';
import Layout from '../components/Layout';

const contact = () => (
  <Layout>
    <div>
      <p>
        Send me an
        {' '}
        <XA href="mailto:hi@blairnangle.com">email</XA>
        {' '}
        or
        {' '}
        <XA href="https://cal.com/blairnangle">schedule a call with me</XA>
        . I check my emails morning, lunch and evening.
      </p>
    </div>
  </Layout>
);

export default contact;
