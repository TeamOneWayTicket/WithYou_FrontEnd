import { InputBox } from '@src/components/ui/atom';
import PostCardHeader from '@src/components/ui/atom/Header/DiaryCardHeader';
import { apiCreateCommentById } from '@src/core/api/apiDiaryComment';
import { IComment } from '@src/core/api/types/api-diary-comment-interface';
import { needDefaultImage } from '@src/utils/imageUtil';
import { twcDivide } from '@src/utils/twcUtil';
import cx from 'classnames';
import React, {
  Fragment,
  FunctionComponent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface Props {
  diaryId: number;
  initialCommentsInfo: IComment[];
}

const DiaryCommentTemplate: FunctionComponent<Props> = ({ diaryId, initialCommentsInfo }) => {
  const commentDivRef = useRef<HTMLDivElement>(null);
  const [commentInput, setCommentInput] = useState('');
  const [commentList, setCommentList] = useState(initialCommentsInfo);

  useEffect(() => {
    if (commentDivRef.current) {
      commentDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commentList]);

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleOnSendComment = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (commentInput.length === 0) return;
    const _comments = await apiCreateCommentById({
      id: diaryId,
      content: commentInput,
    });
    setCommentInput('');
    setCommentList(_comments);
  };

  const DiaryComments = useMemo(() => {
    const RenderComments = () => (
      <div className={cx('bg-primary-bg', 'px-side-padding', twcDivide)}>
        {commentList.length > 0 &&
          commentList.map((comment, idx) => (
            <div key={`diary-comment-${idx}`} className="py-4 space-y-2">
              <PostCardHeader
                profileImage={needDefaultImage(comment.thumbnail)}
                profileName={comment.author}
                timeStamp={comment.createdAt}
              />
              <p>{comment.comment}</p>
            </div>
          ))}
        <div ref={commentDivRef} />
      </div>
    );
    return RenderComments;
  }, [commentList]);

  return (
    <Fragment>
      <DiaryComments />
      <div className="fixed bottom-0 w-full max-w-mobile-app">
        <div className="bg-white px-3 py-2">
          <InputBox
            fullWidth
            className="bg-gray-200 placeholder:text-gray-500"
            roundness="square"
            type="id"
            label=""
            placeholder="댓글을 입력해주세요."
            name="commentInput"
            value={commentInput}
            onKeyPress={handleOnSendComment}
            onChange={handleCommentInputChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DiaryCommentTemplate;
