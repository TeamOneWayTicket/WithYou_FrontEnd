import { inputBoxRoundness, inputBoxSizes, inputBoxStyles } from '@src/utils/constants';
import cx from 'classnames';
import React, { FunctionComponent, InputHTMLAttributes, memo } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> {
  disabled?: boolean;
  type: 'id' | 'email' | 'password';
  name: string;
  label: string;
  value: string | number;
  size?: inputBoxSizes;
  style?: inputBoxStyles;
  roundness?: inputBoxRoundness;
  placeholder?: string;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  className?: string;
}

const selectRounded: { [key in inputBoxRoundness]: string } = {
  primary: 'rounded-[2.5rem]',
  square: 'rounded-[0.5rem]',
  keyboard: 'rounded-none',
};

const sizeSelector: { [keys in inputBoxSizes] } = {
  xsmall: 'h-6 text-xs',
  small: 'h-12',
  medium: 'h-14',
  large: 'h-16',
};

const styleSelector: { [keys in inputBoxStyles] } = {
  primary: 'bg-primary-bg text-black',
  secondary: 'bg-secondary-bg text-black',
  tertiary: 'bg-tertiary-bg text-black',
  transparent: 'bg-transparent text-black',
};

const InputBox: FunctionComponent<Props> = ({
  disabled = false,
  name,
  label,
  size = 'medium',
  style = 'primary',
  roundness = 'primary',
  error,
  errorMessage = 'wrong input',
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <div className={fullWidth ? 'w-full' : 'w-[280px] md:w-[320px]'}>
      <div className="w-full h-full space-y-2">
        {label !== '' && (
          <label htmlFor={name}>{<p className="text-xs font-bold md:text-base">{label}</p>}</label>
        )}
        <input
          disabled={disabled}
          id={name}
          name={name}
          className={cx(
            'p-2 w-full h-full',
            sizeSelector[size],
            styleSelector[style],
            selectRounded[roundness],
            error ? 'border-red-500' : '',
            'focus:outline-none',
            'disabled:bg-gray-500',
            className
          )}
          {...props}
        />
        {style === 'transparent' && <div className="border-b-[1px] border-gray-300" />}
      </div>
      <div className="h-2">
        {error && <p className="text-xs md:text-sm text-red-400">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default memo(InputBox);
