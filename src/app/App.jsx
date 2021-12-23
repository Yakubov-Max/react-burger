import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngridients from '../burger-ingredients/BurgerIngredients';
import appStyles from './App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../services/actions/burger';

function App() {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.burger.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className={appStyles.container}>
        {
          ingredients && (
            <>
              <BurgerIngridients />
              <BurgerConstructor />
            </>
          )
        }
      </main>
    </div>
  );
}

export default App;
