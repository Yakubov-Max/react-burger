import React, {useRef, useEffect} from "react";
import ingridientsStyles from "./BurgerIngridients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from 'prop-types'
import Ingridient from "../ingridient/Ingridient";




const BurgerIngridients = ({ ingridients }) => {
  const main = ingridients.filter((ingredient) => ingredient.type === 'main');
  const buns = ingridients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingridients.filter((ingredient) => ingredient.type === 'sauce');
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
        <div ref={bunTab} className={` ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Булки</h3>
          <div className={ingridientsStyles.grid}>
            {buns.map((item) => (
              <Ingridient key={item._id + "bun"} ingridient={item} />
            ))}
          </div>
        </div>
        <div ref={sauceTab} className={`pt-10 ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Соусы</h3>
          <div className={ingridientsStyles.grid}>
            {sauces.map((item) => (
              <Ingridient key={item._id + "_sauce"} ingridient={item} />
            ))}
          </div>
        </div>
        <div ref={mainTab} className={`pt-10 ${ingridientsStyles.typeSection}`}>
          <h3 className='pb-6 text text_type_main-medium'>Начинки</h3>
          <div className={ingridientsStyles.grid}>
            {main.map((item) => (
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