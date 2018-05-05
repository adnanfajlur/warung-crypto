import Immutable from 'seamless-immutable';
import actionTypes from '../actions/cryptoAction';

export const INITIAL_STATE = Immutable({
  data: null,
  credit: 10000000,
  wallet: [],
});

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_CRYPTO:
      return state.merge({
        data: null,
      });

    case actionTypes.LOAD_CRYPTO_SUCCESS:
      return state.merge({
        data: action.data,
      });

    case actionTypes.HANDLE_CREDIT:
      return state.merge({
        credit: action.data,
      });

    case actionTypes.ADD_WALLET:
      if (Boolean(state.wallet.find(n => n.id === action.data || 'NaN'))) {
        action.data.amount = action.data.amount + state.wallet.find(n => n.id === action.data || 'NaN').amount;
        return state.merge({
          wallet: [...state.wallet.filter(n => n.id !== action.data.id), action.data],
          credit: state.credit - action.data.credit,
        });
      }
      return state.merge({
        wallet: [...state.wallet, action.data],
        credit: state.credit - action.data.credit,
      });

    case actionTypes.TRANSACTION_WALLET:
      return state.merge({
        wallet: [...state.wallet.filter(n => n.id !== action.data.id), action.data],
        credit: action.data.credit,
      });

    default:
      return state;
  }
}

export default reducer;
