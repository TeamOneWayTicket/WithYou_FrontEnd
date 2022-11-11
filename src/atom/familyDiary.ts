import { produce } from 'immer';
import { atom, DefaultValue, selector } from 'recoil';

import { DiaryAtom } from './types/diary-interface';

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

export { addFamilyDiaries, familyDiariesStateAtom };