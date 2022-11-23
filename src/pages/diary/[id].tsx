import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import PostCommentTemplate from '@src/components/template/DiaryPage/DiaryCommentTemplate';
import CommonBackwardHeader from '@src/components/ui/atom/Header/CommonBackwardHeader';
import DetailDiaryCard from '@src/components/ui/molecule/DiaryCard/DetailDiaryCard';
import { apiGetDiaryById } from '@src/core/api/diary/apiDiary';
import { apiGetCommentsById } from '@src/core/api/diary/apiDiaryComment';
import { ApiGetDiaryComments, IComment } from '@src/core/api/types/api-diary-comment-interface';
import { ApiCommonDiaryProps, ApiGetDiary } from '@src/core/api/types/api-diary-interface';
import { useShareAPI } from '@src/hooks/navigation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

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

// Todo: render comments section property on server side rendering too

const PostPage: NextPage<DetailDiaryPageProps> = ({
  diaryId,
  initialDiaryInfo,
  initialCommentsInfo,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [diaryInfo, setDiaryInfo] = useState<ApiCommonDiaryProps>(null);
  const [commentsInfo, setCommentsInfo] = useState<IComment[]>([]);

  const [isShareSupported, shareCB, withyouShareCB] = useShareAPI();

  const handleBackward = useCallback(() => {
    router.back();
  }, [router]);

  const handleCommentCreated = useCallback((newComments: IComment[]) => {
    setCommentsInfo(newComments);
  }, []);

  useEffect(() => {
    setMounted(true);
    setDiaryInfo(initialDiaryInfo);
    setCommentsInfo(initialCommentsInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout
      fullWidth
      fixedHeight
      className="bg-gray-50"
      headerContent={<CommonBackwardHeader onBack={handleBackward} />}
    >
      <div className="relative w-full h-full space-y-2 overflow-y-scroll overflow-x-hidden">
        {mounted ? (
          <Fragment>
            <div className="h-auto">
              <DetailDiaryCard diaryInfo={diaryInfo} onShareClick={withyouShareCB} />
            </div>
            <PostCommentTemplate
              diaryId={diaryId}
              comments={commentsInfo}
              onCommentCreated={handleCommentCreated}
            />
          </Fragment>
        ) : (
          <Fragment>
            <div className="h-auto">
              <DetailDiaryCard diaryInfo={initialDiaryInfo} onShareClick={withyouShareCB} />
            </div>
            <PostCommentTemplate diaryId={diaryId} comments={initialCommentsInfo} />
          </Fragment>
        )}
      </div>
    </PageLayout>
  );
};

export default withAuthCSR(PostPage);
