import React from 'react';
import styled from 'styled-components';
import { TextProps } from './Text.types';

const StyledText = styled.p.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<TextProps>`
  margin: 0;
  font-size: ${(props) => props.size || '16px'};
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  word-wrap: break-word;

  /* Default State */
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  color: ${(props) => props.color || '#212529'};
  cursor: auto;

  @media (max-width: 600px) {
    padding: 4px 8px;
    overflow-wrap: anywhere;
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

export const Text: React.FC<TextProps> = ({
  text,
  children,
  size,
  disabled = false,
  backgroundColor,
  color,
  ...props
}) => {
  return (
    <StyledText
      size={size}
      disabled={disabled}
      backgroundColor={backgroundColor}
      color={color}
      {...props}
    >
      {text || children || 'Sample Text Content'}
    </StyledText>
  );
};

export default Text;
