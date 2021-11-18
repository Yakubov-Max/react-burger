import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngridients from '../burger-ingridients/BurgerIngridients';
import appStyles from './App.module.css'
import INGREDIENTS_URL from '../utils/constants'

function App() {
  const [data, setData] = useState(null);

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
          data && (
            <>
              <BurgerIngridients data={data} />
              <BurgerConstructor data={data} />
            </>
          )
        }
      </main>
    </div>
  );
}

export default App;
