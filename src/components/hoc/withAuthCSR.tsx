import useValidateUser from '@src/hooks/auth/useValidateUser';
import { FunctionComponent } from 'react';

const withAuthClientSide = (Component: FunctionComponent) => {
  const HOCComponent = (props) => {
    useValidateUser();
    return <Component {...props} />;
  };
  return HOCComponent;
};

export default withAuthClientSide;
