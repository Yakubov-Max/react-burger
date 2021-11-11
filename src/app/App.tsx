import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngridients from '../burger-ingridients/BurgerIngridients';
import data from "../utils/data.json"
import appStyles from './App.module.css'

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className={appStyles.container}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
