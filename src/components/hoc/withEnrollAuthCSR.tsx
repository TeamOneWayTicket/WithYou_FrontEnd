import useEnrollUser from '@src/hooks/auth/useEnrollUser';
import { FunctionComponent } from 'react';

const withAuthClientSide = (Component: FunctionComponent) => {
  const HOCComponent = (props) => {
    useEnrollUser();
    return <Component {...props} />;
  };
  return HOCComponent;
};

export default withAuthClientSide;
