import React, {useRef, useEffect} from "react";
import ingredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import Ingredient from "../ingredient/Ingredient";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const ingredients = useSelector(state => state.burger.ingredients)
  const [current, setCurrent] = React.useState(null)

  const bunTab = useRef();
  const sauceTab = useRef();
  const mainTab = useRef();

  useEffect(() => {
    if (current === "buns" && current !== null) {
      bunTab.current.scrollIntoView({behavior: 'smooth'})
    } else if (current === "sauces") {
      sauceTab.current.scrollIntoView({behavior: 'smooth'})
    } else if (current === "main") {
      mainTab.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [current])

  const main = ingredients.filter((ingredient) => ingredient.type === 'main');
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  return (
    <section className={`pt-10 pr-10 ${ingredientsStyles.container}`}>
      <h2 className={`pb-5 text text_type_main-large`}>Соберите бургер</h2>
      <div className={ingredientsStyles.tabContainer}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 pr-1 custom-scroll ${ingredientsStyles.typeContainer}`}>
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