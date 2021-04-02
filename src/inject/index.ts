import { App, inject } from 'vue';
import { commonSymbol } from './constants';
import { InjectMap, I_RootMap } from './map';
import {
  GetCommonInject
} from './common';

// 使用时使用泛型interface传入实现支持类型校验
export const useInjectByType = <T extends any>(symbolKey: string): T => {
  return inject(symbolKey) as T;
};
// 使用时无需传入interface，但需在hooks.ts中做好映射
export const useInject = (symbolKey: keyof I_RootMap) => {
  return InjectMap[symbolKey]();
};

export default (app: App) => {
  app.provide(commonSymbol, GetCommonInject());
}
