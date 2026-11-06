import { ChangeEventHandler } from 'react';

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps {
  /** Array of select options */
  options?: DropdownOption[];
  /** Selected value */
  value?: string | number;
  /** Label or placeholder text for default option */
  placeholder?: string;
  /** Controls disabled state */
  disabled?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Text colour */
  color?: string;
  /** Change event handler */
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}
