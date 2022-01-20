import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ingredientStyles from './ingredient.module.css'
import { useMemo, FC } from "react"
import {useSelector} from '../utils/hooks'
import { useDrag } from "react-dnd"
import { TIngredient } from "../utils/types"

interface IIngredient {
  ingredient: TIngredient,
  handleClick: Function,
}

const Ingredient: FC<IIngredient> = ({ ingredient, handleClick }) => {

  const constructorList = useSelector(state => state.burger.constructorList);
  const bun = useSelector(state => state.burger.bun)
  

  const count:number|undefined = useMemo(() => {
    if (ingredient.type !== 'bun') {
      return constructorList.reduce((acc:number, elem: TIngredient) => elem._id === ingredient._id ? acc + 1 : acc, 0)
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
        {count! > 0 &&
          <Counter count={count!} size="default" />
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