import { SelectOption } from '@src/components/ui/atom/Input/SelectBox';

export type commonRoundness = 'primary' | 'keyboard';
export type commonSizes = 'large' | 'medium' | 'small' | 'xsmall';

export type btnRoundness = commonRoundness;
export type btnSizes = commonSizes | 'none';

export type inputBoxRoundness = commonRoundness | 'square';
export type inputBoxSizes = commonSizes;

export type selectBoxSizes = commonSizes;

export type btnStyles =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'danger'
  | 'success'
  | 'warning'
  | 'wy-blue'
  | 'wy-red'
  | 'wy-yellow'
  | 'transparent';

export type inputBoxStyles = 'primary' | 'secondary' | 'tertiary' | 'transparent';

export const familyRoleList: SelectOption[] = [
  { value: '엄마', label: '엄마' },
  {
    value: '아빠',
    label: '아빠',
  },
  {
    value: '할머니',
    label: '할머니',
  },
  {
    value: '할아버지',
    label: '할아버지',
  },
];
