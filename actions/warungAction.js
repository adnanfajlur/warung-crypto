import Immutable from 'seamless-immutable';

// name spacing with prefix `warung/`
const SHOW_NOTIF = 'warung/SHOW_NOTIF';

// Create Immutable object
const actionTypes = Immutable({
  SHOW_NOTIF,
});

// export it
export default actionTypes;

/* Action Creator */
export function showNotif(param) {
  return {
    type: actionTypes.SHOW_NOTIF,
    param,
  };
}
