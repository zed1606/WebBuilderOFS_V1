import React from 'react';
import styled from 'styled-components';
import { ImageProps } from '../../types/editor';

interface StyledImageProps {
  width?: string;
  height?: string;
}

const StyledImage = styled.img<StyledImageProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  display: block;
  object-fit: cover; /* Or 'contain', depending on desired behavior */
  padding: 5px; /* Basic padding */
`;

const ImageComponent: React.FC<ImageProps> = ({ src, alt, width, height }) => {
  const defaultImage = 'https://via.placeholder.com/150?text=Placeholder+Image';
  return (
    <StyledImage
      src={src || defaultImage}
      alt={alt || 'Placeholder Image'}
      width={width}
      height={height}
    />
  );
};

export default ImageComponent;
