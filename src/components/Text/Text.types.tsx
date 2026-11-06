import { ReactNode } from 'react';

export interface TextProps {
  /** Text content */
  text?: string;
  /** Children content */
  children?: ReactNode;
  /** Font size in pixels or rem */
  size?: string;
  /** Controls disabled state */
  disabled?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  color?: string;
}
