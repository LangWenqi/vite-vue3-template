import { createStore, StoreOptions } from 'vuex';
import { RootState } from './types';
import { common } from './common';
import { CommonModuleName } from './common/constants';

const store: StoreOptions<RootState> = {
  modules: {
    [CommonModuleName]: common
  }
}

export default createStore<RootState>(store)
