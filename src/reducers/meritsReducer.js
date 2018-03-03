import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.merits, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.ADD_MERIT:
        draft.push(action.payload);
        break;
      case types.REMOVE_MERIT:
        const { name } = action.payload;

        for (let i = 0; i < draft.length; i++) {
          if (draft[i].name === name) {
            draft.splice(i, 1);
            break;
          }
        }
        break;
      case types.UPDATE_CLAN:
        // reset, as there are clan-specific merits
        return initialState.character.merits;
      default:
        break;
    }
  });
