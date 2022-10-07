import SvgWrapper from '@src/components/ui/atom/Icon/assets/SvgWrapper';
import { SvgComponentType } from '@src/core/types/svg-type';
import { FunctionComponent } from 'react';

const ShareSvg: FunctionComponent<SvgComponentType> = ({ ...props }) => {
  return (
    <SvgWrapper {...props}>
      <path
        d="M5.33333 15.3332C7.17428 15.3332 8.66667 13.8408 8.66667 11.9998C8.66667 10.1589 7.17428 8.6665 5.33333 8.6665C3.49238 8.6665 2 10.1589 2 11.9998C2 13.8408 3.49238 15.3332 5.33333 15.3332Z"
        fill="currentColor"
      />
      <path
        d="M18.6663 8.66667C20.5073 8.66667 21.9997 7.17428 21.9997 5.33333C21.9997 3.49238 20.5073 2 18.6663 2C16.8254 2 15.333 3.49238 15.333 5.33333C15.333 7.17428 16.8254 8.66667 18.6663 8.66667Z"
        fill="currentColor"
      />
      <path
        d="M18.6663 22.0002C20.5073 22.0002 21.9997 20.5078 21.9997 18.6668C21.9997 16.8259 20.5073 15.3335 18.6663 15.3335C16.8254 15.3335 15.333 16.8259 15.333 18.6668C15.333 20.5078 16.8254 22.0002 18.6663 22.0002Z"
        fill="currentColor"
      />
      <path
        d="M8.11133 10.3336L15.6671 6.77808"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13L16 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgWrapper>
  );
};

export default ShareSvg;
