import PostImageWrapper from '@src/components/ui/molecule/DiaryCard/Wrapper/DiaryImageWrapper';
import MainPostCardWrapper from '@src/components/ui/molecule/DiaryCard/Wrapper/MainDiaryCardWrapper';
import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import Link from 'next/link';
import { FunctionComponent } from 'react';

const MainDiaryCard: FunctionComponent<{
  diaryInfo: ApiCommonDiaryProps;
}> = ({ diaryInfo }) => {
  const {
    diary: { id, content, media },
  } = diaryInfo;

  return (
    <MainPostCardWrapper diaryInfo={diaryInfo}>
      <Link href={`/diary/${id}`}>
        <a className="block">
          <PostImageWrapper media={media} />
        </a>
      </Link>
      <div className="w-full">
        <p className="hide-text-overflow">{content}</p>
        <div className="text-link-700">..더보기</div>
      </div>
    </MainPostCardWrapper>
  );
};

export default MainDiaryCard;
