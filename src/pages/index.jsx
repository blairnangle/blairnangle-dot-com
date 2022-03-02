import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import ZoomImage from '../components/ZoomImage';

import beinnChuirn from '../../static/images/home/beinn-chuirn.jpg';
import beinnChuirnZoom from '../../static/images/home/beinn-chuirn-zoom.jpg';
import amaDablam from '../../static/images/home/ama-dablam.jpg';
import amaDablamZoom from '../../static/images/home/ama-dablam-zoom.jpg';
import aNiceGoat from '../../static/images/home/a-nice-goat.jpg';
import aNiceGoatZoom from '../../static/images/home/a-nice-goat-zoom.jpg';

function Index() {
  const photoCaptionMap = {
    one:
            {
              src: beinnChuirn,
              zoomSrc: beinnChuirnZoom,
              caption: 'Beinn Chùirn, Scotland. August, 2019.',
            },
    two:
            {
              src: amaDablam,
              zoomSrc: amaDablamZoom,
              caption: 'Ama Dablam, Nepal. November, 2019.',
            },
    three:
            {
              src: aNiceGoat,
              zoomSrc: aNiceGoatZoom,
              caption: 'A nice goat, Russia. July, 2018.',
            },
  };

  const randomPhoto = () => {
    const keys = Object.keys(photoCaptionMap);
    return photoCaptionMap[keys[keys.length * Math.random() << 0]];
  };

  const [homePhoto, setHomePhoto] = useState(randomPhoto());

  useEffect(() => {
    setHomePhoto(randomPhoto());
  }, []);

  const photo = randomPhoto();
  console.log(photo);
  return (
    <Layout>
      <div className="home-image">
        <ZoomImage photo={homePhoto} />
      </div>
    </Layout>
  );
}

export default Index;
