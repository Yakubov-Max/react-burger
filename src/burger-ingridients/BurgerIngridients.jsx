import React from "react";
import ingridientsStyles from "./BurgerIngridients.module.css"
import { CurrencyIcon, Tab, Counter } from "@ya.praktikum/react-developer-burger-ui-components"


function BurgerIngridients(props) {
  const main = props.data.filter((ingredient) => ingredient.type === 'main');
  const buns = props.data.filter((ingredient) => ingredient.type === 'bun');
  const sauces = props.data.filter((ingredient) => ingredient.type === 'sauce');
  const [current, setCurrent] = React.useState('buns')

  return (
    <section className={`pt-10 pr-10 ${ingridientsStyles.container}`}>
      <h2 style={{ alignSelf: "flex-start" }} className={`pb-5 text text_type_main-large`}>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
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
      <div className={`mt-10 pr-1 custom-scroll ${ingridientsStyles.typeContainer}`}>
        <div className={` ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Булки</h3>
          <div className={ingridientsStyles.grid}>
            {buns.map((item, index) => (
              <IngridientItem key={item._id} ingridient={item} />
            ))}
          </div>
        </div>
        <div className={`pt-10 ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Соусы</h3>
          <div className={ingridientsStyles.grid}>
            {sauces.map((item, index) => (
              <IngridientItem key={item._id} ingridient={item} />
            ))}
          </div>
        </div>
        <div className={`pt-10 ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Начинки</h3>
          <div className={ingridientsStyles.grid}>
            {main.map((item, index) => (
              <IngridientItem key={item._id} ingridient={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const IngridientItem = (item) => {
  return (
    <div className={ingridientsStyles.itemContainer}>
      <Counter count={1} size="default" />
      <img src={item.image} alt={item.name} />
      <div className='pt-1 pb-1' style={{ display: "flex" }}>
        <span className="text text_type_digits-default" style={{textAlign:"center"}}>{item.price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default text_color_primary">{item.name}</p>
    </div>
  )
}

export default BurgerIngridients