import { Icon, ImageWrapper } from '../../atom';
import ImageWithBackground from '../ImageWithBackground';

const InfiniteSliderItem = () => {
  return (
    <div className="relative w-full h-full">
      <ImageWrapper
        className="rounded-xl pointer-events-none"
        bgFilter="bg-gradient-to-b from-black/0 to-black/30"
        src="/static/banner.jpeg"
        alt="test"
        objectFit="cover"
        layout="fill"
      />
      <div className="absolute z-20 flex flex-col bottom-0 left-0 p-side-padding text-white space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <ImageWithBackground src="/static/sample_profile.png" />
          </div>
          <p>엄마</p>
        </div>
        <div>
          <p>오늘 처음으로 마마 라고 불러줬음 ㅎㅎ 마마 = 엄마 맞지?</p>
        </div>
        <div className="flex space-x-2 py-2">
          <div className="flex text-white">
            <Icon name="comment" />
            <span>댓글 0개</span>
          </div>
          <div className="flex text-white">
            <Icon name="share" />
            <span>공유하기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteSliderItem;
