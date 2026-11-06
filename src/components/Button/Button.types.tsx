import { MouseEventHandler } from 'react';

export interface ButtonProps {
  /** Text content inside the button */
  text?: string;
  /** Controls whether the button is disabled */
  disabled?: boolean;
  /** Background color of the button in its default state */
  backgroundColor?: string;
  /** Text colour */
  color?: string;
  /** Optional click event handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
