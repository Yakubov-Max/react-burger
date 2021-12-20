import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ingredientStyles from './ingredient.module.css'
import IngredientDeatils from "../ingredient-details/IngredientDetails"
import { useState } from "react"
import { ingredientShape } from "../utils/proptypes"
import Modal from "../modal/Modal"

const Ingredient = ({ ingredient }) => {
  const [modalOpen, setModal] = useState(false)

  const handleClose = () => {
    setModal(false)
  }

  const handleOpen = () => {
    setModal(true)
  }

  return (
    <>
    <div onClick={handleOpen} className={ingredientStyles.container}>
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
        <IngredientDeatils ingredient={ingredient}></IngredientDeatils>
      </Modal>
        
      }
    </>
  )
}


Ingredient.propTypes = {
  ingredient: ingredientShape.isRequired,
}

export default Ingredient