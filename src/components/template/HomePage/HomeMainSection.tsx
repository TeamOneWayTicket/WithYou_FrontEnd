import { ButtonWithIcon, ImageWrapper } from '@src/components/atom';
import Link from 'next/link';
import React, { memo } from 'react';

const HomeMainSection = () => {
  return (
    <div className="w-full h-full space-y-2 flex flex-col justify-center items-center text-center">
      <div className="relative w-80 md:w-80">
        <div className="relative w-full">
          <ImageWrapper
            src="/static/mandu.png"
            layout="responsive"
            width="500px"
            height="300px"
            alt="notebook"
            priority
          />
          <h2 className="absolute w-full translate-center-x bottom-14">
            <span className="text-wy-blue-500">오늘</span>을 기록해보세요
          </h2>
        </div>
        <Link href="/create">
          <a className="relative -top-8">
            <ButtonWithIcon
              nameChange="star"
              sizeChange={28}
              fullWidth
              className="text-xl font-bold"
              styles="wy-blue"
              size="large"
            >
              기록 시작하기
            </ButtonWithIcon>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default memo(HomeMainSection);