
import { inject } from 'vue';
import { commonSymbol } from '@/inject/constants';
import { I_CommonInject } from './common/types';

export interface I_RootMap {
  [commonSymbol]: () => I_CommonInject;
}

export const InjectMap: I_RootMap = {
  [commonSymbol]: () => inject(commonSymbol) as I_CommonInject
}
