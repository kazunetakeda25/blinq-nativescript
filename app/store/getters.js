import { GETTERS } from './const';

export const getters = {
  [GETTERS.APP_CONFIG]: ({ appConfig }) => appConfig,
  [GETTERS.PROCESSING]: ({ processingStack }) => (processingStack.length > 0),
};
