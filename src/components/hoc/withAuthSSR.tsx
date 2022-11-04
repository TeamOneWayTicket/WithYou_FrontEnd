import { apiValidate } from '@src/core/api/apiAuth';
import { ValidateResult } from '@src/core/types/auth-type';
import { clearAuthToken, setAuthToken } from '@src/utils/authUtil';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

type WithAuthServerSideContext = GetServerSidePropsContext & {
  credInfo?: ValidateResult;
};

const withAuthSSR = (
  getServerSidePropsFunc?: (
    ctx: WithAuthServerSideContext
  ) => Promise<GetServerSidePropsResult<unknown>>
) => {
  return async (ctx: WithAuthServerSideContext) => {
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
      const credInfo = await apiValidate();
      if (credInfo.user.isNew) {
        return {
          props: {},
          redirect: {
            destination: '/enroll',
            permanent: false,
          },
        };
      }
      if (getServerSidePropsFunc) {
        ctx.credInfo = credInfo;
        getServerSidePropsFunc(ctx);
        return getServerSidePropsFunc(ctx);
      }
      return {
        props: {},
      };
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
