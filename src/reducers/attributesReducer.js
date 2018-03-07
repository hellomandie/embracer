import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { attributeMaxDots } from '../constants/characterOptions';
import { setDotsFromRank } from '../utils/categoryRanker';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';

const isAttributes = category => category === 'attributes';

export default (state = initialState.character.attributes, action) =>
  produce(state, draft => {
    let category, trait, dotsFromRank;

    switch (action.type) {
      case types.SET_RANK:
        ({ category, trait, dotsFromRank } = action.payload);

        if (isAttributes(category)) {
          return setDotsFromRank(draft, trait, dotsFromRank, attributeMaxDots);
        }
        break;
      case types.SET_FOCUS:
        const { attribute, focus } = action.payload;

        draft[attribute].focus = focus;
        break;
      case types.PURCHASE_DOT:
        ({ category, trait } = action.payload);

        if (isAttributes(category)) {
          return addPurchasedDot(draft, trait, attributeMaxDots);
        }
        break;
      case types.UNPURCHASE_DOT:
        ({ category, trait } = action.payload);

        if (isAttributes(category)) {
          return removePurchasedDot(draft, trait, true);
        }
        break;
      default:
        break;
    }
  });
