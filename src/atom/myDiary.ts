import { produce } from 'immer';
import { atom, DefaultValue, selector } from 'recoil';

import { DiaryAtom } from '../core/types/diary-type';

const defaultState: DiaryAtom = {
  isInit: false,
  isLast: null,
  nextId: null,
  diaries: [],
};

const myDiariesStateAtom = atom<DiaryAtom>({
  key: 'myDiariesStateAtom',
  default: defaultState,
});

const addMyDiary = selector<DiaryAtom>({
  key: 'myDiariesStateAtom/addDiaries',
  get: ({ get }) => {
    return get(myDiariesStateAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(myDiariesStateAtom, defaultState);
    } else {
      const nextDiaries = produce(get(myDiariesStateAtom).diaries, (draft) => {
        draft.push(...newValue.diaries);
      });
      set(myDiariesStateAtom, {
        isInit: true,
        isLast: newValue.isLast,
        nextId: newValue.nextId,
        diaries: nextDiaries,
      });
    }
  },
});

const addMyDiaryReverse = selector<DiaryAtom>({
  key: 'myDiariesStateAtom/addPostReverse',
  get: ({ get }) => {
    return get(myDiariesStateAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(myDiariesStateAtom, defaultState);
    } else {
      const nextDiaries = produce(newValue.diaries, (draft) => {
        draft.push(...get(myDiariesStateAtom).diaries);
      });
      set(myDiariesStateAtom, {
        isInit: true,
        isLast: newValue.isLast,
        nextId: newValue.nextId,
        diaries: nextDiaries,
      });
    }
  },
});

export { addMyDiary, addMyDiaryReverse, myDiariesStateAtom };
