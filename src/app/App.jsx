import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngridients from '../burger-ingredients/BurgerIngredients';
import appStyles from './App.module.css'
import { INGREDIENTS_URL } from '../utils/constants'
import { ingredientContext } from '../services/ingredientContext';

function App() {
  const [ingredients, setData] = useState(null);

  useEffect(() => {
    downloadData().then((data) => setData(data))

  }, [])

  const downloadData = async () => {
    try {
      const res = await fetch(INGREDIENTS_URL)
      const dataObj = await res.json()
      return dataObj.data
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className={appStyles.container}>
        {
          ingredients && (
            <ingredientContext.Provider value={ingredients}>
              <BurgerIngridients />
              <BurgerConstructor />
            </ingredientContext.Provider>
          )
        }
      </main>
    </div>
  );
}

export default App;
