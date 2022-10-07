import { withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import PostCommentTemplate from '@src/components/template/PostPage/PostCommentTemplate';
import CommonBackwardHeader from '@src/components/ui/atom/Header/CommonBackwardHeader';
import DetailPostCard from '@src/components/ui/molecule/PostCard/DetailPostCard';
import { samplePostData } from '@src/core/data/sample-post-data';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = withAuthSSR();

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

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
      <div className="w-full h-full space-y-2 overflow-y-scroll">
        <DetailPostCard postInfo={samplePostData[0]} />
        <PostCommentTemplate />
      </div>
    </PageLayout>
  );
};

export default PostPage;
