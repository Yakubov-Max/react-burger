import React from "react";
import ingredientStyles from "./IngredientDetails.module.css"
import { useSelector } from '../utils/hooks'

function IngredientDetails() {
  const ingredient = useSelector(state => state.burger.currentIngredient)

  return (
    <>
      {ingredient &&
        <>
          <h3 className={`${ingredientStyles.header} pl-10 pt-10 text text_type_main-large text_color_primary`}>Детали ингредиента</h3>
          <img className={ingredientStyles.image} src={ingredient.image} alt={ingredient.name} />
          <p className="pb-8 pt-4 text text_type_main-medium text_color_primary">{ingredient.name}</p>
          <ul className={`mb-15  ${ingredientStyles.listContainer}`}>
            <li>
              <p className="pb-2 text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
            </li>
            <li>
              <p className="pb-2 text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
            </li>
            <li>
              <p className="pb-2 text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
            </li>
            <li>
              <p className="pb-2 text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </>
      }
    </>
  )
}

export default IngredientDetails