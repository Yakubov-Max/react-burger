import { useRef, useState } from "react";
import ingredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import Ingredient from "../ingredient/Ingredient";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const ingredients = useSelector(state => state.burger.ingredients)
  const [current, setCurrent] = useState('buns')

  const bunTab = useRef();
  const sauceTab = useRef();
  const mainTab = useRef();

  const main = ingredients.filter((ingredient) => ingredient.type === 'main');
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  const handleScroll = (evt) => {
    const listTop = evt.target.getBoundingClientRect().top

    const bunPos = { top: bunTab.current.getBoundingClientRect().top, bottom: bunTab.current.getBoundingClientRect().bottom }
    const mainPos = { top: mainTab.current.getBoundingClientRect().top, bottom: mainTab.current.getBoundingClientRect().bottom }
    const saucePos = { top: sauceTab.current.getBoundingClientRect().top, bottom: sauceTab.current.getBoundingClientRect().bottom }

    if (bunPos.top <= listTop && bunPos.bottom > listTop) {
      setCurrent('buns')
    } else if (saucePos.top <= listTop && saucePos.bottom > listTop) {
      setCurrent('sauces')
    } else if (mainPos.top <= listTop && mainPos.bottom > listTop) {
      setCurrent('main')
    }
  }

  return (
    <section className={`pt-10 pr-10 ${ingredientsStyles.container}`}>
      <h2 className={`pb-5 text text_type_main-large`}>Соберите бургер</h2>
      <div className={ingredientsStyles.tabContainer}>
        <Tab value="buns" active={current === 'buns'} >
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'}>
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 pr-1 custom-scroll ${ingredientsStyles.typeContainer}`} onScroll={handleScroll}>
        <div ref={bunTab} className={` ${ingredientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Булки</h3>
          <div className={ingredientsStyles.gridContainer}>
            {buns.map((item) => (
              <Ingredient key={item._id} ingredient={item} />
            ))}
          </div>
        </div>
        <div ref={sauceTab} className={`pt-10 ${ingredientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Соусы</h3>
          <div className={ingredientsStyles.gridContainer}>
            {sauces.map((item) => (
              <Ingredient key={item._id} ingredient={item} />
            ))}
          </div>
        </div>
        <div ref={mainTab} className={`pt-10 ${ingredientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Начинки</h3>
          <div className={ingredientsStyles.gridContainer}>
            {main.map((item) => (
              <Ingredient key={item._id} ingredient={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients