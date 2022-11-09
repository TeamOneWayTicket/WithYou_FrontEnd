import { ImageWrapper } from '@src/components/ui/atom';
import Link from 'next/link';
import React from 'react';

const ReviewCard = () => {
  return (
    <Link href="/review">
      <a>
        <div className="relative w-full h-30">
          <ImageWrapper
            src="/static/sample_family_01.png"
            bgFilter="bg-black/20"
            layout="fill"
            objectFit="cover"
          />
          <div className="z-10 relative px-side-padding py-4 space-y-2">
            <h1 className="text-white">
              <div>작년 여름의</div>
              <div>로그를 확인해보세요</div>
            </h1>
            <h2 className="text-wy-yellow-500">보러가기</h2>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ReviewCard;
