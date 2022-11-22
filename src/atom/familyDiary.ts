import { produce } from 'immer';
import { atom, DefaultValue, selector } from 'recoil';

import { DiaryAtom } from '../core/types/diary-type';

const defaultState: DiaryAtom = {
  isInit: false,
  isLast: null,
  nextId: null,
  diaries: [],
};

const familyDiariesStateAtom = atom<DiaryAtom>({
  key: 'diariesStateAtom',
  default: defaultState,
});

const addFamilyDiaries = selector<DiaryAtom>({
  key: 'diariesStateAtom/addDiaries',
  get: ({ get }) => {
    return get(familyDiariesStateAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(familyDiariesStateAtom, defaultState);
    } else {
      const nextDiaries = produce(get(familyDiariesStateAtom).diaries, (draft) => {
        draft.push(...newValue.diaries);
      });
      set(familyDiariesStateAtom, {
        isInit: true,
        isLast: newValue.isLast,
        nextId: newValue.nextId,
        diaries: nextDiaries,
      });
    }
  },
});

const addFamilyDiariesReverse = selector<DiaryAtom>({
  key: 'diariesStateAtom/addDiariesReverse',
  get: ({ get }) => {
    return get(familyDiariesStateAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(familyDiariesStateAtom, defaultState);
    } else {
      const nextDiaries = produce(newValue.diaries, (draft) => {
        draft.push(...get(familyDiariesStateAtom).diaries);
      });
      set(familyDiariesStateAtom, {
        isInit: true,
        isLast: newValue.isLast,
        nextId: newValue.nextId,
        diaries: nextDiaries,
      });
    }
  },
});

export { addFamilyDiaries, addFamilyDiariesReverse, familyDiariesStateAtom };
