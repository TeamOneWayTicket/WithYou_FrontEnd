import useNoValidateUser from '@src/hooks/auth/useNoValidateUser';
import { FunctionComponent } from 'react';

const withAuthClientSide = (Component: FunctionComponent) => {
  const HOCComponent = (props) => {
    useNoValidateUser();
    return <Component {...props} />;
  };
  return HOCComponent;
};

export default withAuthClientSide;
