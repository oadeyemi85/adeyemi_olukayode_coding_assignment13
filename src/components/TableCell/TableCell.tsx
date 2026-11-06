import React from 'react';
import styled, { css } from 'styled-components';
import { TableCellProps } from './TableCell.types';

const sharedStyles = css<TableCellProps>`
  padding: 12px;
  text-align: left;
  border: 1px solid #dddddd;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  color: ${(props) => props.color || 'inherit'};
  transition: all 0.2s ease-in-out;

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 14px;
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: #cccccc !important;
    color: #666666 !important;
    cursor: not-allowed !important;
  `}
`;

const StyledTd = styled.td.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<TableCellProps>`
  ${sharedStyles}
`;

const StyledTh = styled.th.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<TableCellProps>`
  ${sharedStyles}
  font-weight: bold;
`;

export const TableCell: React.FC<TableCellProps> = ({
  text,
  children,
  isHeader = false,
  disabled = false,
  backgroundColor,
  ...props
}) => {
  const content = text || children || 'Cell Content';

  if (isHeader) {
    return (
      <StyledTh disabled={disabled} backgroundColor={backgroundColor} {...props}>
        {content}
      </StyledTh>
    );
  }

  return (
    <StyledTd disabled={disabled} backgroundColor={backgroundColor} {...props}>
      {content}
    </StyledTd>
  );
};

export default TableCell;
