import React, { useRef, useState } from "react";
import ingredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import Ingredient from "../ingredient/Ingredient";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { REMOVE_CURRENT_INGREDIENT, ADD_CURRENT_INGREDIENT } from "../services/actions/burger";
import { TIngredient } from "../utils/types";
import { useSelector, useDispatch } from '../utils/hooks'


const BurgerIngredients = () => {
  const ingredients = useSelector(state => state.burger.ingredients)
  const dispatch = useDispatch()
  const [current, setCurrent] = useState('buns')

  const bunTab = useRef<HTMLDivElement | null>(null);
  const sauceTab = useRef<HTMLDivElement | null>(null);
  const mainTab = useRef<HTMLDivElement | null>(null);

  const main = ingredients.filter((ingredient: TIngredient) => ingredient.type === 'main');
  const buns = ingredients.filter((ingredient: TIngredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient: TIngredient) => ingredient.type === 'sauce');

  const handleScroll = (evt:any) => {
    const listTop = evt.target.getBoundingClientRect().top


    if (bunTab.current && mainTab.current && sauceTab.current) {
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
  }

  const handleClose = () => {
    dispatch({
      type: REMOVE_CURRENT_INGREDIENT
    })
  }

  const handleOpen = (item: TIngredient) => {
    dispatch({
      type: ADD_CURRENT_INGREDIENT,
      item: item
    })
  }

  const currentModalIngredient = useSelector(state => state.burger.currentIngredient)

  return (
    <>
      <section className={`pt-10 pr-10 ${ingredientsStyles.container}`}>
        <h2 className={`pb-5 text text_type_main-large`}>Соберите бургер</h2>
        <div className={ingredientsStyles.tabContainer}>
          <Tab value="buns" active={current === 'buns'} onClick={() => setCurrent('buns')} >
            Булки
          </Tab>
          <Tab value="sauces" active={current === 'sauces'} onClick={() => setCurrent('sauces')}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>
            Начинки
          </Tab>
        </div>
        <div className={`mt-10 pr-1 custom-scroll ${ingredientsStyles.typeContainer}`} onScroll={handleScroll}>
          <div ref={bunTab} className={` ${ingredientsStyles.typeSection}`}>
            <h3 className='pb-6 text text_type_main-medium'>Булки</h3>
            <div className={ingredientsStyles.gridContainer}>
              {buns.map((item: TIngredient) => (
                <Ingredient key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
          <div ref={sauceTab} className={`pt-10 ${ingredientsStyles.typeSection}`}>
            <h3 className='pb-6 text text_type_main-medium'>Соусы</h3>
            <div className={ingredientsStyles.gridContainer}>
              {sauces.map((item: TIngredient) => (
                <Ingredient key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
          <div ref={mainTab} className={`pt-10 ${ingredientsStyles.typeSection}`}>
            <h3 className='pb-6 text text_type_main-medium'>Начинки</h3>
            <div className={ingredientsStyles.gridContainer}>
              {main.map((item: TIngredient) => (
                <Ingredient key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {
        currentModalIngredient &&
        <Modal handleClose={handleClose}>
          <IngredientDetails></IngredientDetails>
        </Modal>
      }

    </>
  )
}

export default BurgerIngredients