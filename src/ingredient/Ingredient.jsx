import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ingredientStyles from './ingredient.module.css'
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useDrag } from "react-dnd"

const Ingredient = ({ ingredient, handleClick }) => {

  const constructorList = useSelector(state => state.burger.constructorList);
  const bun = useSelector(state => state.burger.bun)

  const count = useMemo(() => {
    if (ingredient.type !== 'bun') {
      return constructorList.reduce((acc, elem) => elem._id === ingredient._id ? acc + 1 : acc, 0)
    } else if (bun && bun._id === ingredient._id) {
      return 1
    }
  }, [bun, constructorList, ingredient._id, ingredient.type])

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient }
  })

  return (
    <>
      <div className={ingredientStyles.container} ref={dragRef} onClick={() => handleClick(ingredient)}>
        {count > 0 &&
          <Counter count={count} size="default" />
        }
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={`${ingredientStyles.flexContainer} pt-1 pb-1`}>
          <span className={`$ text text_type_digits-default pr-2`}>{ingredient.price}</span>
          <CurrencyIcon type={"primary"} />
        </div>
        <p className="text text_type_main-default text_color_primary">{ingredient.name}</p>
      </div>
    </>
  )
}

export default Ingredient