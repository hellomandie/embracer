import produce from 'immer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.mode, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.TOGGLE_PENCIL_ERASER_MODE:
        draft.isEraser = !draft.isEraser;
        break;
      default:
        break;
    }
  });
