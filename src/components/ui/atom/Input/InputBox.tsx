import { inputBoxSizes, inputBoxStyles } from '@src/utils/constants';
import cx from 'classnames';
import React, { ChangeEventHandler, FunctionComponent, memo } from 'react';

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

const InputBox: FunctionComponent<{
  disabled?: boolean;
  type: 'id' | 'email' | 'password';
  name: string;
  label: string;
  value: string | number;
  size?: inputBoxSizes;
  style?: inputBoxStyles;
  placeholder?: string;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  classNames?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({
  disabled = false,
  name,
  label,
  size = 'medium',
  style = 'primary',
  error,
  errorMessage = 'wrong input',
  fullWidth = false,
  classNames,
  ...props
}) => {
  return (
    <div className={fullWidth ? 'w-full' : 'w-[280px] md:w-[320px]'}>
      <div className="w-full h-full space-y-2">
        <label htmlFor={name}>
          <p className="text-xs font-bold md:text-base">{label}</p>
        </label>
        <input
          disabled={disabled}
          id={name}
          name={name}
          className={cx(
            'p-2 w-full h-full',
            sizeSelector[size],
            styleSelector[style],
            style === 'transparent' ? 'border-b border-gray-300' : 'border-2 rounded-xl',
            error ? 'border-red-500' : '',
            'focus:outline-none',
            'disabled:bg-gray-500',
            classNames
          )}
          {...props}
        />
      </div>
      <div className="h-4">
        {error && <p className="text-xs md:text-sm text-red-400">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default memo(InputBox);
