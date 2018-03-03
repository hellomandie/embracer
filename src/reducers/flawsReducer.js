import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.flaws, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.ADD_FLAW:
        draft.push(action.payload);
        break;
      case types.REMOVE_FLAW:
        const { name } = action.payload;

        for (let i = 0; i < draft.length; i++) {
          if (draft[i].name === name) {
            draft.splice(i, 1);
            break;
          }
        }
        break;
      default:
        break;
    }
  });
