import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TargetRowHeight = 220;
const Gap = 12;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Gap}px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Gap}px;
  overflow: hidden;
`;

const Photo = styled.a`
  display: block;
  flex: 0 0 ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  overflow: hidden;
  border: none;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.link};
    outline-offset: 3px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function makeRows(photos, containerWidth) {
  const rows = [];
  let row = [];
  let aspectRatio = 0;

  photos.forEach((photo) => {
    const ratio = photo.width / photo.height;
    const nextRatio = aspectRatio + ratio;
    const nextHeight = (containerWidth - (row.length * Gap)) / nextRatio;

    if (row.length > 0 && nextHeight < TargetRowHeight) {
      rows.push({ photos: row, height: (containerWidth - ((row.length - 1) * Gap)) / aspectRatio });
      row = [];
      aspectRatio = 0;
    }

    row.push({ ...photo, ratio });
    aspectRatio += ratio;
  });

  if (row.length > 0) {
    const height = (containerWidth - ((row.length - 1) * Gap)) / aspectRatio;
    rows.push({ photos: row, height: Math.min(height, TargetRowHeight) });
  }

  return rows;
}

function JustifiedGallery({ photos }) {
  const galleryRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(830);
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    resizeObserver.observe(gallery);

    return () => resizeObserver.disconnect();
  }, []);

  const measuredPhotos = photos
    .map((photo) => ({ ...photo, ...dimensions[photo.relativePath] }))
    .filter((photo) => photo.width && photo.height);
  const rows = makeRows(measuredPhotos, containerWidth);

  return (
    <Gallery ref={galleryRef}>
      {photos.map((photo) => (
        <img
          key={photo.relativePath}
          src={photo.publicURL}
          alt=""
          hidden
          onLoad={({ currentTarget }) => {
            setDimensions((current) => ({
              ...current,
              [photo.relativePath]: {
                width: currentTarget.naturalWidth,
                height: currentTarget.naturalHeight,
              },
            }));
          }}
        />
      ))}
      {rows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`}>
          {row.photos.map((photo) => {
            const width = row.height * photo.ratio;

            return (
              <Photo
                key={photo.relativePath}
                href={photo.publicURL}
                target="_blank"
                rel="noopener noreferrer"
                $width={width}
                $height={row.height}
                aria-label={`Open ${photo.name}`}
              >
                <img src={photo.publicURL} alt={photo.name} />
              </Photo>
            );
          })}
        </Row>
      ))}
    </Gallery>
  );
}

export default JustifiedGallery;
