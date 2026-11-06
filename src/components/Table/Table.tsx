import React from 'react';
import styled from 'styled-components';
import { TableProps } from './Table.types';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Responsive table wrapper */
`;

const StyledTable = styled.table.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<TableProps>`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  transition: all 0.2s ease-in-out;

  /* Default State */
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
  color: ${(props) => props.color || 'inherit'};
  border: 1px solid ${(props) => props.borderColor || '#dddddd'};

  /* Disabled State */
  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    border-color: #aaaaaa !important;
    cursor: not-allowed !important;
    opacity: 0.7;

    * {
      background-color: #cccccc !important;
      color: #666666 !important;
      cursor: not-allowed !important;
    }
  `}
`;

export const Table: React.FC<TableProps> = ({
  children,
  disabled = false,
  backgroundColor,
  borderColor,
  ...props
}) => {
  return (
    <TableContainer>
      <StyledTable
        disabled={disabled}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        {...props}
      >
        {children}
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
