import { apiValidate } from '@src/core/api/apiAuth';
import { clearAuthToken, setAuthToken } from '@src/utils/authUtil';
import { GetServerSideProps } from 'next';

const withAuthSSR = (getServerSidePropsFunc?: GetServerSideProps) => {
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
          redirect: {
            destination: '/enroll',
            permanent: false,
          },
        };
      }
      return await getServerSidePropsFunc?.(ctx);
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
