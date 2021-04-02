import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { CommonState } from './types';
import { SET_TIME_STEP, HANDLE_TIME_STEP, GETTER_TIME_STEP } from './constants';
import { RootState } from '../types';

const state: CommonState = {
  timestep: 0
}

export const getters: GetterTree<CommonState, RootState> = {
  [GETTER_TIME_STEP] (state): string {
    return 'store-getter:' + state.timestep + '';
  }
}

const mutations: MutationTree<CommonState> = {
  [SET_TIME_STEP] (state, timestep: number) {
    state.timestep = timestep;
  }
}

const actions: ActionTree<CommonState, RootState> = {
  [HANDLE_TIME_STEP] ({ commit }, timestep: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(SET_TIME_STEP, timestep);
        resolve(timestep);
      }, 1000)
    })
  }
}

export const common: Module<CommonState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
