import React, { useEffect } from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngridients from '../burger-ingredients/BurgerIngredients';
import appStyles from './App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../services/actions/burger';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.burger.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <AppHeader />
      <main className={appStyles.container}>
        {
          ingredients && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngridients />
              <BurgerConstructor />
            </DndProvider>
          )
        }
      </main>
    </div>
  );
}

export default App;
