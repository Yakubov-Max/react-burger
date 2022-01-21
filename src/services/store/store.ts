import {
  Action,
  ActionCreator,
  applyMiddleware,
  compose,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { TActions } from "../actions/burger";
import { rootReducer } from "../reducers";

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

type TApplicationActions = TActions;
export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof store.dispatch;
