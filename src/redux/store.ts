import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reducers as commonReducers } from './reducers/common';
import dpUtils from '@/utils/dp';

const createDpKitMiddleware = () => {};

const reducers = {
  ...commonReducers,
};

type Reducers = typeof reducers;

export type ReduxState = { [K in keyof Reducers]: ReturnType<Reducers[K]> };

export const rootReducers = combineReducers(reducers);

const isDebuggingInChrome = true;
const logger = createLogger({
  predicate: () => true,
  collapsed: true,
  duration: true,
});
const dpKitMiddleware = createDpKitMiddleware({
  putDeviceData: data => {
    return dpUtils.putDpDataOrigin(data);
  },
  rawDpMap: dpUtils.dpMaps,
  sendDpOption: {},
});

const middleware = isDebuggingInChrome
  ? [thunk, logger, dpKitMiddleware]
  : [thunk, dpKitMiddleware];

function configureStore(initialState?: Partial<ReduxState>) {
  const appliedMiddleware = applyMiddleware(...middleware);
  const store = createStore(rootReducers, initialState, compose(appliedMiddleware));
  return store;
}

export const store = configureStore();
