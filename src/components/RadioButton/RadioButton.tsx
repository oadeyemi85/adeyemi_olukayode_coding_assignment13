import React from 'react';
import styled from 'styled-components';
import { RadioButtonProps } from './RadioButton.types';

const RadioWrapper = styled.label.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<RadioButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.2s ease-in-out;
  user-select: none;

  /* Default State */
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  color: ${(props) => props.color || '#333333'};
  cursor: pointer;

  @media (max-width: 600px) {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
  }

  /* Disabled State */
  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    color: #666666 !important;
    cursor: not-allowed !important;
    opacity: 0.7;

    input {
      cursor: not-allowed !important;
    }
  `}
`;

const StyledRadio = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const RadioButton: React.FC<RadioButtonProps> = ({
  label = 'Radio Option',
  name,
  value,
  checked,
  disabled = false,
  backgroundColor,
  color,
  onChange,
  ...props
}) => {
  return (
    <RadioWrapper disabled={disabled} backgroundColor={backgroundColor} color={color}>
      <StyledRadio
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={disabled ? undefined : onChange}
        {...props}
      />
      <span>{label}</span>
    </RadioWrapper>
  );
};

export default RadioButton;
