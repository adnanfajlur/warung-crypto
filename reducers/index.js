import { combineReducers } from 'redux';
import cryptoReducer from './cryptoReducer';
import warungReducer from './warungReducer';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    crypto: cryptoReducer,
    warung: warungReducer,
  });

  return rootReducer;
};
