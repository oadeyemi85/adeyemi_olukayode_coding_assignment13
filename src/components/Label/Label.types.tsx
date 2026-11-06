import { ReactNode } from 'react';

export interface LabelProps {
  /** Text or content inside the label */
  text?: string;
  /** Children nodes if passed directly */
  children?: ReactNode;
  /** Controls whether the label is in a disabled state */
  disabled?: boolean;
  /** Background color of the label */
  backgroundColor?: string;
  /** Font color of the label */
  color?: string;
  /** Associated form input ID */
  htmlFor?: string;
}
