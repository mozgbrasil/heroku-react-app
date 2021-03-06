// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { MURPHY_COUNTER_RESET } from './constants';

export function counterReset() {
  return {
    type: MURPHY_COUNTER_RESET,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MURPHY_COUNTER_RESET:
      return {
        ...state,
        count: 0,
      };

    default:
      return state;
  }
}
