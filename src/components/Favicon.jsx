import React from 'react';
import Helmet from 'react-helmet';

function Favicon() {
  return (
    <Helmet>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../../static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../../static/favicon-16x16.png"
      />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
}

export default Favicon;
