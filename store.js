import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'seamless-immutable';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers/index';

export function configureStore(initialState = {}) {
  /* eslint-disable no-param-reassign */
  if (!initialState.toJS) {
    initialState = Immutable(initialState);
  }

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers
= typeof window === 'object'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export function withRedux(BaseComponent) {
  return (configureStore)(BaseComponent);
}
