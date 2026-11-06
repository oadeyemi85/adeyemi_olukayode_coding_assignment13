import { ReactNode } from 'react';

export interface TableFooterProps {
  children?: ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  /** Text colour */
  color?: string;
}
