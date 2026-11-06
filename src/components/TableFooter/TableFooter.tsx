import React from 'react';
import styled from 'styled-components';
import { TableFooterProps } from './TableFooter.types';

const StyledTableFooter = styled.tfoot.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'borderColor', 'color'].includes(prop),
})<TableFooterProps>`
  background-color: ${(props) => props.backgroundColor || '#eaeded'};
  color: ${(props) => props.color || 'inherit'};
  font-weight: bold;
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

export const TableFooter: React.FC<TableFooterProps> = ({
  children,
  disabled = false,
  backgroundColor,
  ...props
}) => {
  return (
    <StyledTableFooter disabled={disabled} backgroundColor={backgroundColor} {...props}>
      {children}
    </StyledTableFooter>
  );
};

export default TableFooter;
