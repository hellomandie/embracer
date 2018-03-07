import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { standardTraitMaxDots } from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';

const isBackgrounds = category => category === 'backgrounds';

export default (state = initialState.character.backgrounds, action) =>
  produce(state, draft => {
    let category, trait, startingDots;

    switch (action.type) {
      case types.SET_STARTING_DOTS:
        ({ category, trait, startingDots } = action.payload);

        if (isBackgrounds(category)) {
          return setDotsFromStartingDots(
            draft,
            trait,
            startingDots,
            standardTraitMaxDots
          );
        }
        break;
      case types.PURCHASE_DOT:
        ({ category, trait } = action.payload);

        if (isBackgrounds(category)) {
          return addPurchasedDot(draft, trait, standardTraitMaxDots);
        }
        break;
      case types.UNPURCHASE_DOT:
        ({ category, trait } = action.payload);

        if (isBackgrounds(category)) {
          return removePurchasedDot(draft, trait);
        }
        break;
      default:
        break;
    }
  });
