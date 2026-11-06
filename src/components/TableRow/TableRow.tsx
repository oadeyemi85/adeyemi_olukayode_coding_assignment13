import React from 'react';
import styled from 'styled-components';
import { TableRowProps } from './TableRow.types';

const StyledTableRow = styled.tr.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<TableRowProps>`
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  color: ${(props) => props.color || 'inherit'};
  transition: all 0.2s ease-in-out;

  &:nth-child(even) {
    background-color: ${(props) => props.backgroundColor || '#f9f9f9'};
  }

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

export const TableRow: React.FC<TableRowProps> = ({
  children,
  disabled = false,
  backgroundColor,
  ...props
}) => {
  return (
    <StyledTableRow disabled={disabled} backgroundColor={backgroundColor} {...props}>
      {children}
    </StyledTableRow>
  );
};

export default TableRow;
