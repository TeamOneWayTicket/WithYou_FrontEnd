import { ApiCommonDiaryProps } from '@src/core/api/interface/api-diary-interface';
import { atom, DefaultValue, selector } from 'recoil';

interface DiaryAtom {
  posts: ApiCommonDiaryProps[];
}

const defaultState: DiaryAtom = {
  posts: [],
};

const postsStateAtom = atom<DiaryAtom>({
  key: 'postsStateAtom',
  default: defaultState,
});

const addPosts = selector<DiaryAtom>({
  key: 'postsStateAtom/addPosts',
  get: ({ get }) => {
    return get(postsStateAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(postsStateAtom, defaultState);
    } else {
      const nextPosts = [...get(postsStateAtom).posts, ...newValue.posts];
      set(postsStateAtom, {
        posts: nextPosts,
      });
    }
  },
});

const addPostsReverse = selector<DiaryAtom>({
  key: 'postsStateAtom/addPostReverse',
  get: ({ get }) => {
    return get(postsStateAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(postsStateAtom, defaultState);
    } else {
      const nextPosts = [...newValue.posts, ...get(postsStateAtom).posts];
      set(postsStateAtom, {
        posts: nextPosts,
      });
    }
  },
});

export { addPosts, addPostsReverse, postsStateAtom };
