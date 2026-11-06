import { ChangeEventHandler } from 'react';

export interface RadioButtonProps {
  /** Label displayed beside the radio button */
  label?: string;
  /** Radio input name attribute */
  name?: string;
  /** Radio input value attribute */
  value?: string;
  /** Checked state */
  checked?: boolean;
  /** Controls disabled state */
  disabled?: boolean;
  /** Background color of the container wrapper */
  backgroundColor?: string;
  /** Text colour */
  color?: string;
  /** Change handler */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
