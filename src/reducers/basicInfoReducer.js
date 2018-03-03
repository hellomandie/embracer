import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.basicInfo, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_ARCHETYPE:
        draft.archetype = action.payload;
        break;
      case types.UPDATE_CLAN:
        draft.clan = action.payload;
        break;
      default:
        break;
    }
  });
