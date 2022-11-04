import useEnrollUser from '@src/hooks/auth/useEnrollUser';

const withAuthClientSide = (Component: any) => {
  const HOCComponent = (props) => {
    useEnrollUser();
    return <Component {...props} />;
  };
  return HOCComponent;
};

export default withAuthClientSide;
