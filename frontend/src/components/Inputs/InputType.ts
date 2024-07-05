import { ChangeEvent, FocusEvent } from "react";

export interface InputProps {
  name: string;
  // WHETHER IT SHOULD BE onChange or SetField is disputable, we'll sort it out in use.
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: JSX.Element | string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  inputMode?: InputModeEnum;
  initialStyle?: string;
  errorMessage?: string;
  displayError?: boolean;
}

export interface TextInputProps extends InputProps {
  value: string;
  type?: TextInputTypes;
  maxLength?: number;
  minLength?: number;
}

export interface CheckboxInputProps extends Omit<InputProps, "placeholder"> {
  value: string | number | string[] | undefined;
  checked: boolean;
}

export interface NumericalInputProps extends InputProps {
  value: number | undefined;
  step?: number;
  min?: number;
  max?: number;
}

export interface DateInputProps extends InputProps {
  value: string;
  /**
   * The minimum allowed date value.
   * Should match the format YYYY-MM-DD.
   */
  min?: string;
  /**
   * The maximum allowed date value.
   * Should match the format YYYY-MM-DD.
   */
  max?: string;
}

export interface RadioInputProps extends InputProps {
  value: string;
  checked?: boolean;
}
export interface TextAreaProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  minLength?: number;
}

export enum TextInputTypes {
  EMAIL = "email",
  TEXT = "text",
  PASSWORD = "password",
  DATE = "date",
}

export enum InputModeEnum {
  SEARCH = "search",
  EMAIL = "email",
  TEL = "tel",
  TEXT = "text",
  URL = "url",
  NONE = "none",
  NUMERIC = "numeric",
  DECIMAL = "decimal",
}

export type textInputChangeType = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;
export type selectChangeType = (
  event: React.ChangeEvent<HTMLSelectElement>
) => void;
