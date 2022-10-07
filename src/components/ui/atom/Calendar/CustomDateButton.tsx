import React, { forwardRef, ForwardRefRenderFunction } from 'react';

type CustomButtonProps = {
  value: string;
  onClick?: () => void;
};

const CustomDateButton: ForwardRefRenderFunction<HTMLButtonElement, CustomButtonProps> = (
  { value, onClick },
  ref
) => {
  return (
    <button className="w-24 h-10 bg-transparent text-black" onClick={onClick} ref={ref}>
      {value}
    </button>
  );
};

export default forwardRef(CustomDateButton);
