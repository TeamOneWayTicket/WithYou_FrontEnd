import { ApiCommonDiaryProps } from '@src/core/api/interface/api-diary-interface';
import { atom, DefaultValue, selector } from 'recoil';

interface DiaryAtom {
  diaries: ApiCommonDiaryProps[];
}

const defaultState: DiaryAtom = {
  diaries: [],
};

const diariesStateAtom = atom<DiaryAtom>({
  key: 'diariesStateAtom',
  default: defaultState,
});

const addFamilyDiaries = selector<DiaryAtom>({
  key: 'diariesStateAtom/addDiaries',
  get: ({ get }) => {
    return get(diariesStateAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(diariesStateAtom, defaultState);
    } else {
      const nextDiaries = [...get(diariesStateAtom).diaries, ...newValue.diaries];
      set(diariesStateAtom, {
        diaries: nextDiaries,
      });
    }
  },
});

export { addFamilyDiaries, diariesStateAtom };
