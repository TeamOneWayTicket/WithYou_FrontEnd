import { apiValidate } from '@src/core/api/apiAuth';
import { clearAuthToken, setAuthToken } from '@src/utils/authUtil';

const withShouldNoAuthSSR = () => {
  return async (ctx) => {
    const token = ctx.req.cookies.jwt;

    if (!token) {
      clearAuthToken();
      return {
        props: {},
      };
    }

    setAuthToken(token);

    try {
      const {
        user: { isNew },
      } = await apiValidate();
      if (isNew) {
        return {
          props: {},
          redirect: {
            destination: '/enroll',
            permanent: false,
          },
        };
      }
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } catch (error) {
      clearAuthToken();
      return {
        props: {},
      };
    }
  };
};

export default withShouldNoAuthSSR;
