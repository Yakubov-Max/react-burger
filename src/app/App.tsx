import React from 'react';
import './App.css';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngridients from '../burger-ingridients/BurgerIngridients';
import data from "../utils/data.json"

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main style={{display: 'flex', justifyContent: 'center'}}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
