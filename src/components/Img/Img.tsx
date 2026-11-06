import React from 'react';
import { placeholderImage } from '../../placeholder';
import styled from 'styled-components';
import { ImgProps } from './Img.types';

const ImageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<ImgProps>`
  display: inline-block;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  max-width: 100%;

  /* Default State */
  background-color: ${(props) => props.backgroundColor || 'transparent'};

  @media (max-width: 600px) {
    display: block;
    box-sizing: border-box;
  }

  /* Disabled State */
  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    cursor: not-allowed !important;
    opacity: 0.5;
    filter: grayscale(100%);

    img {
      cursor: not-allowed !important;
      pointer-events: none;
    }
  `}
`;

const StyledImg = styled.img.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<ImgProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  max-width: 100%;
  display: block;
  border-radius: 4px;
  object-fit: cover;
`;

export const Img: React.FC<ImgProps> = ({
  src = placeholderImage,
  alt = 'Sample Image',
  width,
  height,
  disabled = false,
  backgroundColor,
  ...props
}) => {
  return (
    <ImageContainer disabled={disabled} backgroundColor={backgroundColor}>
      <StyledImg src={src} alt={alt} width={width} height={height} {...props} />
    </ImageContainer>
  );
};

export default Img;
