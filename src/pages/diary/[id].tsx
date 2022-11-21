import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import PostCommentTemplate from '@src/components/template/DiaryPage/DiaryCommentTemplate';
import CommonBackwardHeader from '@src/components/ui/atom/Header/CommonBackwardHeader';
import DetailDiaryCard from '@src/components/ui/molecule/DiaryCard/DetailDiaryCard';
import { apiGetDiaryById } from '@src/core/api/diary/apiDiary';
import { apiGetCommentsById } from '@src/core/api/diary/apiDiaryComment';
import { ApiGetDiaryComments } from '@src/core/api/types/api-diary-comment-interface';
import { ApiGetDiary } from '@src/core/api/types/api-diary-interface';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface DetailDiaryPageProps {
  diaryId: number;
  initialDiaryInfo: ApiGetDiary;
  initialCommentsInfo: ApiGetDiaryComments;
}

export const getServerSideProps = withAuthSSR(async (ctx) => {
  const { id } = ctx.params;

  if (!id || Array.isArray(id)) {
    return {
      props: {},
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  try {
    const diaryId = Number(id);
    const [diaryInfo, commentsInfo] = await Promise.all([
      apiGetDiaryById(diaryId),
      apiGetCommentsById(diaryId),
    ]);
    return {
      props: {
        diaryId,
        initialDiaryInfo: diaryInfo,
        initialCommentsInfo: commentsInfo,
      },
    };
  } catch (e) {
    return {
      props: {},
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
});

const PostPage: NextPage<DetailDiaryPageProps> = ({
  diaryId,
  initialDiaryInfo,
  initialCommentsInfo,
}) => {
  const router = useRouter();

  const handleBackward = () => {
    router.back();
  };

  return (
    <PageLayout
      fullWidth
      fixedHeight
      className="bg-gray-50"
      headerContent={<CommonBackwardHeader onBack={handleBackward} />}
    >
      <div className="relative w-full h-full space-y-2">
        <div className="relative w-full h-[380px]">
          <DetailDiaryCard diaryInfo={initialDiaryInfo} />
        </div>
        <div className="relative w-full h-[calc(100%-380px)] overflow-y-scroll">
          <PostCommentTemplate diaryId={diaryId} initialCommentsInfo={initialCommentsInfo} />
        </div>
      </div>
    </PageLayout>
  );
};

export default withAuthCSR(PostPage);
