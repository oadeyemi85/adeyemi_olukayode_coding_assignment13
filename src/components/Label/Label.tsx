import React from 'react';
import styled from 'styled-components';
import { LabelProps } from './Label.types';

const StyledLabel = styled.label.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<LabelProps>`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  max-width: 100%;

  /* Default State */
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  color: ${(props) => props.color || '#333333'};
  cursor: pointer;

  @media (max-width: 600px) {
    display: block;
    font-size: 13px;
  }

  /* Disabled State */
  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    color: #666666 !important;
    cursor: not-allowed !important;
    opacity: 0.7;
  `}
`;

export const Label: React.FC<LabelProps> = ({
  text,
  children,
  disabled = false,
  backgroundColor,
  color,
  htmlFor,
  ...props
}) => {
  return (
    <StyledLabel
      disabled={disabled}
      backgroundColor={backgroundColor}
      color={color}
      htmlFor={disabled ? undefined : htmlFor}
      {...props}
    >
      {text || children || 'Label Text'}
    </StyledLabel>
  );
};

export default Label;
