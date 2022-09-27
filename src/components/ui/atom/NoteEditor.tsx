import { hideBottomBar, showBottomBar } from '@src/atom/layout';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const NoteEditor = () => {
  const hideBottomBarCB = useSetRecoilState(hideBottomBar);
  const showBottomBarCB = useSetRecoilState(showBottomBar);
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    // use React Query? to get the note
  }, []);

  const handleTitleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      textAreaRef.current?.focus();
    }
  };

  const handleTextEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      e.preventDefault();
      titleRef.current?.focus();
    }
  };

  const handleOnFocus = () => {
    hideBottomBarCB();
  };

  const handleOnBlur = () => {
    showBottomBarCB();
  };

  return (
    <div className="w-full h-full flex flex-col space-y-2">
      <input
        ref={titleRef}
        className={cx('w-full h-8', 'bg-transparent', 'no-border-outline', 'h1')}
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleTitleEnter}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <textarea
        ref={textAreaRef}
        className={cx(
          'z-10 relative',
          'w-full h-full',
          'bg-transparent',
          'no-border-outline',
          'overflow-scroll'
        )}
        value={note}
        placeholder={'Write your note here'}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={handleTextEnter}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
};

// should turn off ssr for text editor
export default dynamic(() => Promise.resolve(NoteEditor), {
  ssr: false,
});