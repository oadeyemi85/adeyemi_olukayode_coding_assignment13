import React from 'react';
import styled from 'styled-components';
import { CardProps } from './Card.types';

const CardWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<CardProps>`
  width: 100%;
  max-width: 350px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  /* Default State */
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
  color: ${(props) => props.color || '#333333'};

  /* Disabled State */
  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    color: #666666 !important;
    border-color: #aaaaaa !important;
    cursor: not-allowed !important;
    box-shadow: none;
    opacity: 0.7;

    * {
      color: #666666 !important;
      cursor: not-allowed !important;
    }
  `}
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

export const Card: React.FC<CardProps> = ({
  title = 'Card Title',
  content = 'Card content details go here.',
  imageUrl,
  children,
  disabled = false,
  backgroundColor,
  ...props
}) => {
  return (
    <CardWrapper disabled={disabled} backgroundColor={backgroundColor} {...props}>
      {imageUrl && <CardImage src={imageUrl} alt={title} />}
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{content}</CardText>
        {children}
      </CardBody>
    </CardWrapper>
  );
};

export default Card;
