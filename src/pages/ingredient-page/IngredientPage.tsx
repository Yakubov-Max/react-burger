import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import styles from './ingredientPage.module.css'

function IngredientPage() {
  const { id }: any = useParams();
  const ingredients = useSelector(state => state.burger.ingredients)
  const ingredient = ingredients.filter((ingredient) => ingredient._id === id)[0]

  return (
    <>
      {ingredient &&
        <div className={`${styles.container}`}>
          <h3 className={`${styles.header} pl-10 pt-10 text text_type_main-large text_color_primary`}>Детали ингредиента</h3>
          <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
          <p className="pb-8 pt-4 text text_type_main-medium text_color_primary">{ingredient.name}</p>
          <ul className={`mb-15  ${styles.listContainer}`}>
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
        </div>
      }
    </>
  )
}

export default IngredientPage;
