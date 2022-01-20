import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import thunk, {ThunkAction} from 'redux-thunk';
import {TActions} from "./services/actions/burger"
import { applyMiddleware, createStore, compose, Action, ActionCreator } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';


// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

  // const enhancer = composeEnhancers(applyMiddleware(thunk));
  
  type TApplicationActions = TActions
  const store = createStore(rootReducer, applyMiddleware(thunk));

  export type RootState = ReturnType<typeof store.getState>
  export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>
  export type AppDispatch = typeof store.dispatch

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
