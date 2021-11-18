import React from "react";
import ingridientsStyles from "./BurgerIngridients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from 'prop-types'
import Ingridient from "../ingridient/Ingridient";



const BurgerIngridients = (props) => {
  const main = props.data.filter((ingredient) => ingredient.type === 'main');
  const buns = props.data.filter((ingredient) => ingredient.type === 'bun');
  const sauces = props.data.filter((ingredient) => ingredient.type === 'sauce');
  const [current, setCurrent] = React.useState('buns')

  return (
    <section className={`pt-10 pr-10 ${ingridientsStyles.container}`}>
      <h2 className={`pb-5 text text_type_main-large flex-start`}>Соберите бургер</h2>
      <div className={ingridientsStyles.flex}>
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
              <Ingridient key={item._id + "bun"} ingridient={item} />
            ))}
          </div>
        </div>
        <div className={`pt-10 ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Соусы</h3>
          <div className={ingridientsStyles.grid}>
            {sauces.map((item, index) => (
              <Ingridient key={item._id + "_sauce"} ingridient={item} />
            ))}
          </div>
        </div>
        <div className={`pt-10 ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Начинки</h3>
          <div className={ingridientsStyles.grid}>
            {main.map((item, index) => (
              <Ingridient key={item._id + "_main"} ingridient={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerIngridients