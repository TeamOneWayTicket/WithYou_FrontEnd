import SvgWrapper from '@src/components/ui/atom/Icon/assets/SvgWrapper';
import { SvgComponentType } from '@src/core/types/svg-type';
import React, { FunctionComponent } from 'react';

const DefaultProfile: FunctionComponent<SvgComponentType> = ({ ...props }) => {
  return (
    <SvgWrapper {...props}>
      <circle cx="50" cy="50" r="50" fill="#D5DDE5" />
    </SvgWrapper>
  );
};

export default DefaultProfile;
