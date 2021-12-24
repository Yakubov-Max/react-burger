import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ingredientStyles from './ingredient.module.css'
import IngredientDetails from "../ingredient-details/IngredientDetails"
import { useState } from "react"
import Modal from "../modal/Modal"
import { useDispatch } from "react-redux"
import { ADD_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT } from "../services/actions/burger"
import { useDrag } from "react-dnd"

const Ingredient = ({ ingredient }) => {
  const dispatch = useDispatch()
  const [modalOpen, setModal] = useState(false)

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {ingredient}
  })

  const handleClose = () => {
    setModal(false)
    dispatch({
      type: REMOVE_CURRENT_INGREDIENT
    })
  }

  const handleOpen = () => {
    dispatch({
      type: ADD_CURRENT_INGREDIENT,
      item: ingredient
    })
    setModal(true)
  }

  return (
    <>
      <div onClick={handleOpen} className={ingredientStyles.container} ref={dragRef}>
        <Counter count={1} size="default" />
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={`${ingredientStyles.flexContainer} pt-1 pb-1`}>
          <span className={`$ text text_type_digits-default pr-2`}>{ingredient.price}</span>
          <CurrencyIcon type={"primary"} />
        </div>
        <p className="text text_type_main-default text_color_primary">{ingredient.name}</p>
      </div>
      {modalOpen &&
        <Modal handleClose={handleClose}>
          <IngredientDetails></IngredientDetails>
        </Modal>
      }
    </>
  )
}

export default Ingredient