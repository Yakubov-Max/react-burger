import React, { useState } from "react"
import constructorStyles from "./BurgerConstructor.module.css"
import PropTypes from 'prop-types'
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from '../order-details/OrderDetails';


const BurgerConstructor = ({ ingridients }) => {
  const mainIngridients = ingridients.filter((item) => item.type !== "bun")

  const [modalOpen, setModal] = useState(false)

  const handleClose = () => {
    setModal(false)
  }

  const handleOpen = () => {
    setModal(true)
  }

  return (
    <section className={`pt-25  ${constructorStyles.container}`}>
      <ConstructorElement
        key={"top"}
        type={'top'}
        isLocked={true}
        handleClose={undefined}
        text={`${ingridients[0].name} (верх)`}
        thumbnail={ingridients[0].image}
        price={ingridients[0].price} />

      <ul className={`custom-scroll ${constructorStyles.list} pl-2 mt-4 mb-4 pr-1`}>
        {mainIngridients.map((item) => (
          <li key={item._id} className={'ml-8'}>
            <ConstructorElement
              type={undefined}
              isLocked={false}
              handleClose={undefined}
              text={item.name}
              thumbnail={item.image}
              price={item.price} />
          </li>
        ))}

      </ul>
      <ConstructorElement
        key={"bottom"}
        type={'bottom'}
        isLocked={true}
        handleClose={undefined}
        text={`${ingridients[0].name} (низ)`}
        thumbnail={ingridients[0].image}
        price={ingridients[0].price} />

      <div className={`pt-10 ${constructorStyles.flexContainer} ${constructorStyles.flexEnd}`}>
        <div className={`pr-10 ${constructorStyles.flexContainer}`}>
          <p className="pr-2 text text_type_digits-medium text_color_primary">610</p>
          <CurrencyIcon className="pr-10" />
        </div>
        <Button type="primary" onClick={handleOpen} size="medium">
          Оформить заказ
        </Button>
      </div>
      {modalOpen &&
        <OrderDetails handleClose={handleClose}></OrderDetails>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerConstructor;