import { createStore as reduxCreateStore } from 'redux';

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      title: state.title + 1,
    });
  }
  return state;
};

const initialState = { title: 200 };
const devtools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const pakai = () => reduxCreateStore(reducer, initialState, devtools);
const tidakPakai = () => reduxCreateStore(reducer, initialState);
const createStore = typeof window !== 'undefined' ? pakai : tidakPakai;
export default createStore;
