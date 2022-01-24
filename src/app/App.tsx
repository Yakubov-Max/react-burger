import React, { useEffect } from 'react';
import AppHeader from '../app-header/AppHeader';
import appStyles from './App.module.css'
import { useDispatch, useSelector } from '../utils/hooks';
import { getIngredients } from '../services/actions/burger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/login/LoginPage'
import RegisterPage from '../pages/register/RegisterPage';
import ForgotPasswordPage from '../pages/forgot-password/ForgotPasswordPage'
import ResetPasswordPage from '../pages/reset-password/ResetPasswordPage';
import ProfilePage from '../pages/profile-page/ProfilePage';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

function App() {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.burger.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <Router>
        <AppHeader />
        <main className={appStyles.container}>
          <Switch>
            <Route path='/' exact={true}>
              {
                ingredients && (
                  <MainPage />
                )
              }
            </Route>
            <Route path='/login' exact={true}>
              <LoginPage />
            </Route>
            <Route path='/register' exact={true}>
              <RegisterPage />
            </Route>
            <Route path='/forgot-password' exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path='/reset-password' exact={true}>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>

          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
