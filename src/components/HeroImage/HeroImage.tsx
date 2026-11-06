import React from 'react';
import { placeholderImage } from '../../placeholder';
import styled from 'styled-components';
import { HeroImageProps } from './HeroImage.types';

const HeroContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<HeroImageProps>`
  position: relative;
  width: 100%;
  height: ${(props) => props.height || '350px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${(props) => props.color || '#ffffff'};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  /* Background setup */
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('${(props) => props.src || placeholderImage}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(props) => props.backgroundColor || '#222222'};

  /* Responsive styling */
  @media (max-width: 768px) {
    height: 250px;
    padding: 16px;
  }

  /* Disabled State */
  ${(props) =>
    props.disabled &&
    `
    background-image: none !important;
    background-color: #cccccc !important;
    color: #666666 !important;
    cursor: not-allowed !important;
    opacity: 0.7;
    filter: grayscale(100%);
  `}
`;

const HeroTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const HeroSubtitle = styled.p`
  margin: 0;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const HeroImage: React.FC<HeroImageProps> = ({
  src = placeholderImage,
  title = 'Hero Title Content',
  subtitle = 'Supporting subtitle description goes here',
  height,
  disabled = false,
  backgroundColor,
  ...props
}) => {
  return (
    <HeroContainer
      src={src}
      height={height}
      disabled={disabled}
      backgroundColor={backgroundColor}
      {...props}
    >
      <HeroTitle>{title}</HeroTitle>
      <HeroSubtitle>{subtitle}</HeroSubtitle>
    </HeroContainer>
  );
};

export default HeroImage;
