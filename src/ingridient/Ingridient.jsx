import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ingridientStyles from './ingridient.module.css'
import IngridientDeatils from "../ingridient-details/IngridientDetails"
import { useState } from "react"
import { ingridientShape } from "../utils/proptypes"

const Ingridient = ({ ingridient }) => {
  const [modalOpen, setModal] = useState(false)

  const handleClose = () => {
    setModal(false)
  }

  const handleOpen = () => {
    setModal(true)
  }

  return (
    <>
    <div onClick={handleOpen} className={ingridientStyles.container}>
      <Counter count={1} size="default" />
      <img src={ingridient.image} alt={ingridient.name} />
      <div className={`${ingridientStyles.flexContainer} pt-1 pb-1`}>
        <span className={`$ text text_type_digits-default pr-2`}>{ingridient.price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default text_color_primary">{ingridient.name}</p>
    </div>
      {modalOpen && 
        <IngridientDeatils ingridient={ingridient} handleClose={handleClose}></IngridientDeatils>
      }
    </>
  )
}


Ingridient.propTypes = {
  ingridient: ingridientShape.isRequired,
}

export default Ingridient