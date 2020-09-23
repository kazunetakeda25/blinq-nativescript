import { MUTATORS } from './const';

export const mutations = {
  [MUTATORS.SET_APP_CONFIG]: (state, appConfig) => {
    state.appConfig = appConfig;
  },
  [MUTATORS.ADD_PROCESSING]: (state) => {
    state.processingStack = [...state.processingStack, '1'];
  },
  [MUTATORS.REMOVE_PROCESSING]: (state) => {
    state.processingStack.pop();
  },
};
