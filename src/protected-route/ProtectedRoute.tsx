import React, {ReactNode} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { FC } from 'react';
import { useSelector } from '../utils/hooks';

interface IProtectedRoute {
  rest?: any,
  children: ReactNode
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const userState = useSelector(state => state.user)

  return (
    <Route {...rest} render={() =>
      userState.userName ? (children) : (
        <Redirect to='/login'/>
      ) }/>
  );
}