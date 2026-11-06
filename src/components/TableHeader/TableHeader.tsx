import React from 'react';
import styled from 'styled-components';
import { TableHeaderProps } from './TableHeader.types';

const StyledTableHeader = styled.thead.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<TableHeaderProps>`
  background-color: ${(props) => props.backgroundColor || '#f4f4f4'};
  color: ${(props) => props.color || 'inherit'};
  transition: all 0.2s ease-in-out;

  @media (max-width: 600px) {
    font-size: 14px;
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    cursor: not-allowed !important;
  `}
`;

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  disabled = false,
  backgroundColor,
  ...props
}) => {
  return (
    <StyledTableHeader disabled={disabled} backgroundColor={backgroundColor} {...props}>
      {children}
    </StyledTableHeader>
  );
};

export default TableHeader;
