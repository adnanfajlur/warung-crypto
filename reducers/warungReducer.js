import Immutable from 'seamless-immutable';
import actionTypes from '../actions/warungAction';

export const INITIAL_STATE = Immutable({
  fromAdnan: 'Thanks To Gatsbyjs :-)',
  loading: false,
  notif: null,
});

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.SHOW_NOTIF:
      return state.merge({
        loading: false,
        notif: action.data,
      });

    default:
      return state;
  }
}

export default reducer;
