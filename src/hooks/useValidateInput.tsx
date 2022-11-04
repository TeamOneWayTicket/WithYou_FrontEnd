import React from 'react';

export default function useValidateInput<T>(
  initialState: T,
  pattern: RegExp,
  errorMessage: string
) {
  const [myState, setMyState] = React.useState<T>(initialState);
  const [error, setError] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMyState(value as unknown as T);
    const isValid = pattern.test(value);
    setIsValid(isValid);
    setError(isValid ? '' : errorMessage);
  };

  return [myState, isValid, error, handleInputChange] as const;
}
