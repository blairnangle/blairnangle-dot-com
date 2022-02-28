import React from 'react';
import Helmet from 'react-helmet';

function Favicon() {
  return (
    <Helmet>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../../static/favicon.ico"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../../static/favicon.ico"
      />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
}

export default Favicon;
