import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
  outOfClanDisciplineLevelLimit,
  standardTraitMaxDots
} from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';

const isDisciplines = category => category.lastIndexOf('disciplines.', 0) === 0;

const getAffinity = category => category.slice('disciplines.'.length);

const getMaxDots = affinity =>
  affinity === 'outOfClan'
    ? outOfClanDisciplineLevelLimit
    : standardTraitMaxDots;

export default (state = initialState.character.disciplines, action) =>
  produce(state, draft => {
    let category, trait, startingDots, affinity, maxDots;

    switch (action.type) {
      case types.SET_STARTING_DOTS:
        ({ category, trait, startingDots } = action.payload);

        if (isDisciplines(category)) {
          affinity = getAffinity(category);
          maxDots = getMaxDots(affinity);

          draft[affinity] = setDotsFromStartingDots(
            draft[affinity],
            trait,
            startingDots,
            maxDots
          );
        }
        break;
      case types.PURCHASE_DOT:
        ({ category, trait } = action.payload);

        if (isDisciplines(category)) {
          affinity = getAffinity(category);
          maxDots = getMaxDots(affinity);

          draft[affinity] = addPurchasedDot(draft[affinity], trait, maxDots);
        }
        break;
      case types.UNPURCHASE_DOT:
        ({ category, trait } = action.payload);

        if (isDisciplines(category)) {
          affinity = getAffinity(category);

          draft[affinity] = removePurchasedDot(draft[affinity], trait);
        }
        break;
      case types.UPDATE_CLAN:
        // reset
        return initialState.character.disciplines;
      default:
        break;
    }
  });
