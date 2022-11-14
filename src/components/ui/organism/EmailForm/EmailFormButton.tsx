import { Button } from '@src/components/ui/atom';
import React, { FunctionComponent, memo } from 'react';

const SignupStartSection: FunctionComponent<{
  submitButtonText: string;
  notFoundText: string;
  onNotFoundClick: () => void;
}> = ({ submitButtonText, notFoundText, onNotFoundClick }) => {
  return (
    <div className="flex flex-col w-full items-start space-y-4">
      <Button fullWidth styles="wy-blue" type="submit">
        <h3 className="text-white">{submitButtonText}</h3>
      </Button>
      <Button fullWidth styles="wy-red" onClick={onNotFoundClick}>
        <p>{notFoundText}</p>
      </Button>
    </div>
  );
};

export default memo(SignupStartSection);
