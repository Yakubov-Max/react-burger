import React, { useEffect } from 'react';
import AppHeader from '../app-header/AppHeader';
import appStyles from './App.module.css'
import { useDispatch, useSelector } from '../utils/hooks';
import { getIngredients } from '../services/actions/burger';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/login/LoginPage'
import RegisterPage from '../pages/register/RegisterPage';
import ForgotPasswordPage from '../pages/forgot-password/ForgotPasswordPage'
import ResetPasswordPage from '../pages/reset-password/ResetPasswordPage';
import ProfilePage from '../pages/profile-page/ProfilePage';
import IngredientPage from '../pages/ingredient-page/IngredientPage';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

function App() {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.burger.ingredients)
  const location: any = useLocation()
  const background = location.state && location.state.background;
  const history = useHistory()

  useEffect(() => {
    dispatch(getIngredients())
    history.push(location.pathname)
  }, [dispatch, history])

  return (
    <div>
      <AppHeader />
      <main className={appStyles.container}>
        <Switch location={background || location}>
          <Route path='/' exact={true}>
            {
              ingredients && (
                <MainPage />
              )
            }
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage></IngredientPage>
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
          <Route path='/orders' exact={true}>
            <div>orders</div>
          </Route>
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        </Switch>
      </main>
      {background && <Route path="/ingredients/:id"></Route>}
    </div>
  );
}

export default App;
