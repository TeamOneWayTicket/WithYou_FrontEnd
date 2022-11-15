import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import cx from 'classnames';
import Link from 'next/link';
import { Fragment, FunctionComponent } from 'react';

import DiaryImageWrapper from './DiaryImageWrapper';

interface Props {
  showContentReverse?: boolean;
  showFullContent?: boolean;
  diaryInfo: ApiCommonDiaryProps;
}

const threshold = 20;

const DiaryContent: FunctionComponent<Props> = ({
  showContentReverse,
  showFullContent,
  diaryInfo,
}) => {
  const {
    diary: { id, content, media },
  } = diaryInfo;

  return (
    <div
      className={cx(
        'w-full h-full space-y-2 flex',
        showContentReverse ? 'flex-col-reverse' : 'flex-col'
      )}
    >
      <Link href={`/diary/${id}`}>
        <a className="block">
          <DiaryImageWrapper media={media} />
        </a>
      </Link>
      <div className="w-full">
        {showFullContent ? (
          <p>{content}</p>
        ) : (
          <p>
            {content.length > threshold ? (
              <Fragment>
                {content.slice(0, threshold)}
                <Link href={`/diary/${id}`}>
                  <a className="text-link-500">...더보기</a>
                </Link>
              </Fragment>
            ) : (
              content
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default DiaryContent;
