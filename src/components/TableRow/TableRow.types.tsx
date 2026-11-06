import { ReactNode } from 'react';

export interface TableRowProps {
  children?: ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  /** Text colour */
  color?: string;
}
