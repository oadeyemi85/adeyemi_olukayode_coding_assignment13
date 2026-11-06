import { ReactNode } from 'react';

export interface CardProps {
  /** Card title */
  title?: string;
  /** Card description or text content */
  content?: string;
  /** Optional card image URL */
  imageUrl?: string;
  /** Children content if passed directly */
  children?: ReactNode;
  /** Controls disabled state */
  disabled?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Text colour */
  color?: string;
}
