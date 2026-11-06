import React from 'react';
import styled from 'styled-components';
import { ButtonProps } from './Button.types';

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<ButtonProps>`
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  width: 100%;
  max-width: 300px; /* Ensures responsiveness */

  /* Default State Styling */
  background-color: ${(props) => props.backgroundColor || '#007bff'};
  color: ${(props) => props.color || '#ffffff'};
  cursor: pointer;

  &:hover {
    opacity: ${(props) => (props.disabled ? '1' : '0.9')};
  }

  /* Disabled State Styling */
  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    color: #666666 !important;
    cursor: not-allowed !important;
    opacity: 0.7;
  `}
`;

export const Button: React.FC<ButtonProps> = ({
  text = 'Click Me',
  disabled = false,
  backgroundColor,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      disabled={disabled}
      backgroundColor={backgroundColor}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
