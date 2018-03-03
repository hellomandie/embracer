import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
  humanity,
  moralityStartingDotsHumanity,
  moralityStartingDotsPath
} from '../constants/characterOptions';

export default (state = initialState.character.morality, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.PURCHASE_MORALITY_DOT:
        if (!draft.dotsPurchased && draft.path === humanity) {
          draft.dotsPurchased = 1;
        }
        break;
      case types.UNPURCHASE_MORALITY_DOT:
        if (draft.dotsPurchased) {
          delete draft.dotsPurchased;
        }
        break;
      case types.UPDATE_MORALITY:
        const { path, meritPoints } = action.payload;

        if (draft.path !== path) {
          return path === humanity
            ? { path: humanity, startingDots: moralityStartingDotsHumanity }
            : { path, meritPoints, startingDots: moralityStartingDotsPath };
        }
        break;
      case types.UPDATE_CLAN:
        // reset due to clan affinities with paths
        return initialState.character.morality;
      default:
        break;
    }
  });
