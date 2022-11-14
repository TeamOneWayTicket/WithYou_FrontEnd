import { inputBoxSizes, selectBoxSizes } from '@src/utils/constants';
import cx from 'classnames';
import React, { ChangeEventHandler, FunctionComponent } from 'react';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectBoxShape = {
  size?: selectBoxSizes;
  fullWidth?: boolean;
  name: string;
  label: string;
  defaultValue: string;
  optionList: SelectOption[];
  onSelect: ChangeEventHandler<HTMLSelectElement>;

  classNames?: string;
};

const _sizeSelector: { [keys in inputBoxSizes] } = {
  xsmall: 'h-6 text-xs',
  small: 'h-12',
  medium: 'h-14',
  large: 'h-16',
};

const SelectBox: FunctionComponent<SelectBoxShape> = ({
  size = 'medium',
  fullWidth = false,
  name,
  label,
  defaultValue,
  optionList,
  onSelect,
  classNames,
}) => {
  return (
    <div className={fullWidth ? 'w-full' : 'w-[280px] md:w-[320px]'}>
      <div className="w-full h-full space-y-2">
        <label htmlFor={name}>
          <p className="text-xs font-bold md:text-base">{label}</p>
        </label>
        <select
          name={name}
          className={cx(
            'p-2 w-full h-full relative py-2 cursor-pointer',
            _sizeSelector[size],
            'border-2 rounded-xl border-primary-500 border-solid',
            'appearance-none outline-none',
            classNames
          )}
          onChange={onSelect}
          defaultValue={defaultValue}
        >
          <option key={defaultValue} value={defaultValue} disabled>
            {defaultValue}
          </option>
          {optionList.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
