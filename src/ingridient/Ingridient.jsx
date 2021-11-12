import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ingridientStyles from './ingridient.module.css'
import PropTypes from "prop-types"

const Ingridient = ({ ingridient }) => {
  return (
    <div className={ingridientStyles.container}>
      <Counter count={1} size="default" />
      <img src={ingridient.image} alt={ingridient.name} />
      <div className='pt-1 pb-1 flex'>
        <span className="text text_type_digits-default flex">{ingridient.price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default text_color_primary">{ingridient.name}</p>
    </div>
  )
}

const ingridientShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
})


Ingridient.propTypes = {
  ingridient: ingridientShape.isRequired,
}

export default Ingridient