import { ReactNode } from 'react';

export interface TableHeaderProps {
  children?: ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  /** Text colour */
  color?: string;
}
