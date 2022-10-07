import 'react-datepicker/dist/react-datepicker.css';

import { ko } from 'date-fns/locale';
import React, { FunctionComponent, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { IconButton } from '..';
import CustomDateButton from './CustomDateButton';

export type CustomDatePickerProps = Omit<ReactDatePickerProps, 'onChange'> & {
  onChange: (date: Date) => void;
  onClick?: () => void;
};

const CustomDatePicker: FunctionComponent<CustomDatePickerProps> = ({ onChange, onClick }) => {
  const [startDate, setStartDate] = useState(new Date());

  // do not wrap with useCallback(it will always return new function)
  const handleDateChange = (day: number) => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + day);
      onChange(newDate);
      return newDate;
    });
  };

  return (
    <div className="relative inline-block w-28">
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          onChange(date);
        }}
        dateFormat="M월 d일"
        customInput={<CustomDateButton value={startDate.toDateString()} onClick={onClick} />}
        withPortal
      />
      <IconButton
        name="dropLeftArrow"
        className="absolute left-0 translate-center-y text-gray-400"
        size={24}
        onClick={() => handleDateChange(-1)}
      />
      <IconButton
        name="dropRightArrow"
        className="absolute right-0 translate-center-y text-gray-400"
        size={24}
        onClick={() => handleDateChange(1)}
      />
    </div>
  );
};

export default CustomDatePicker;
