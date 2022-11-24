import { ImageWrapper } from '@src/components/ui/atom';
import { IBannerProps } from '@src/core/api/types/api-diary-interface';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

interface Props {
  banner: IBannerProps;
}

const ReviewCard: FunctionComponent<Props> = ({ banner }) => {
  const { date, subject } = banner;
  return (
    <Link href={`/review?date=${date}`}>
      <a>
        <div className="relative w-full h-40">
          <ImageWrapper
            src="/static/sample_family_01.png"
            bgFilter="bg-black/20"
            layout="fill"
            objectFit="cover"
          />
          <div className="z-10 relative px-side-padding py-4 space-y-2 w-3/5">
            <h1 className="text-white">
              <div>{subject}</div>
            </h1>
            <h2 className="text-wy-yellow-500">보러가기</h2>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ReviewCard;
