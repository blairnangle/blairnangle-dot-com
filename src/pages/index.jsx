import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';

function Index() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Layout>
      <div className="home-image">
        <p>You have arrived.</p>
      </div>
    </Layout>
  );
}

export default Index;
