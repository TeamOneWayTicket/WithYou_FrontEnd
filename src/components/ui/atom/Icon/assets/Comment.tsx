import SvgWrapper from '@src/components/ui/atom/Icon/assets/SvgWrapper';
import { SvgComponentType } from '@src/core/types/svg-type';
import { FunctionComponent } from 'react';

const CommentSvg: FunctionComponent<SvgComponentType> = ({ ...props }) => {
  return (
    <SvgWrapper {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 11.2541C2 6.1001 6.477 1.9231 12 1.9231C17.523 1.9231 22 6.1021 22 11.2541C22 16.4061 17.523 20.5841 12 20.5841C10.9988 20.5849 10.0024 20.4452 9.04 20.1691L5.683 22.0771V18.4871C4.55066 17.6493 3.62852 16.5597 2.98936 15.3045C2.3502 14.0493 2.0115 12.6626 2 11.2541ZM8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12ZM13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11ZM16 12C16.5523 12 17 11.5523 17 11C17 10.4477 16.5523 10 16 10C15.4477 10 15 10.4477 15 11C15 11.5523 15.4477 12 16 12Z"
        fill="currentColor"
      />
    </SvgWrapper>
  );
};

export default CommentSvg;
