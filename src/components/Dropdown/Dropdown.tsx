import React from 'react';
import styled from 'styled-components';
import { DropdownProps } from './Dropdown.types';

const StyledSelect = styled.select.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<DropdownProps>`
  width: 100%;
  max-width: 320px;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease-in-out;

  /* Default State */
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
  color: ${(props) => props.color || '#333333'};
  cursor: pointer;

  &:focus {
    border-color: #007bff;
  }

  /* Disabled State */
  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    color: #666666 !important;
    border-color: #aaaaaa !important;
    cursor: not-allowed !important;
    opacity: 0.7;
  `}
`;

export const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value,
  placeholder = 'Select an option',
  disabled = false,
  backgroundColor,
  onChange,
  ...props
}) => {
  return (
    <StyledSelect
      disabled={disabled}
      value={value}
      backgroundColor={backgroundColor}
      onChange={disabled ? undefined : onChange}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Dropdown;
