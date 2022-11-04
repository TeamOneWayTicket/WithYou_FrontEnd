import { apiValidate } from '@src/core/api/apiAuth';
import { clearAuthToken, setAuthToken } from '@src/utils/authUtil';

const withAuthSSR = () => {
  return async (ctx) => {
    const token = ctx.req.cookies.jwt;

    if (!token) {
      clearAuthToken();
      return {
        props: {},
        redirect: {
          destination: '/login',
          permanent: false,
        },
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
        };
      } else {
        return {
          props: {},
          redirect: {
            destination: '/',
            permanent: true,
          },
        };
      }
    } catch (error) {
      clearAuthToken();
      return {
        props: {},
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };
};

export default withAuthSSR;
