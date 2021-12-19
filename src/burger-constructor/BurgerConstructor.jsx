import { useContext, useEffect, useState } from "react"
import constructorStyles from "./BurgerConstructor.module.css"
import PropTypes from 'prop-types'
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from '../order-details/OrderDetails';
import { ingridientShape } from "../utils/proptypes";
import { ingridientContext } from "../services/ingridientContext";

const BurgerConstructor = () => {
  const ingridients = useContext(ingridientContext)

  const [modalOpen, setModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [ingridients])

  const mainIngridients = ingridients.filter((item) => item.type !== "bun")

  const bun = ingridients[0]
  const bunPrice = bun.price * 2

  const ingridientsId = []
  ingridients.forEach(element => {
    ingridientsId.push(element._id)
  });

  const handleClose = () => {
    setModal(false)
  }

  const handleOpen = () => {
    sendOrder(ingridientsId)
    setModal(true)
  }

  const calculateTotalPrice = () => {
    return ingridients.reduce((sum, ingridient) => sum + ingridient.price, bunPrice)
  }

  const sendOrder = async (ingridientsId) => {
    try {
      const res = await fetch(`https://norma.nomoreparties.space/api/orders`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: ingridientsId })
      })
      const data = await res.json()
      setOrderNumber(data.order.number)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className={`pt-25  ${constructorStyles.container}`}>
      <ConstructorElement
        key={"top"}
        type={'top'}
        isLocked={true}
        handleClose={undefined}
        text={`${bun.name} (верх)`}
        thumbnail={bun.image}
        price={bun.price} />

      <ul className={`custom-scroll ${constructorStyles.list} pl-2 mt-4 mb-4 pr-1`}>
        {mainIngridients.map((item) => (
          <li key={item._id} className={'ml-4'}>
            <ConstructorElement
              type={null}
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
        text={`${bun.name} (низ)`}
        thumbnail={bun.image}
        price={bun.price} />

      <div className={`pt-10 ${constructorStyles.flexContainer} ${constructorStyles.checkoutContainer}`}>
        <div className={`pr-10 ${constructorStyles.flexContainer}`}>
          <p className="pr-2 text text_type_digits-medium text_color_primary">{totalPrice}</p>
          <CurrencyIcon className="pr-10" />
        </div>
        <Button type="primary" onClick={handleOpen} size="medium">
          Оформить заказ
        </Button>
      </div>
      {modalOpen &&
        <OrderDetails handleClose={handleClose} orderNumber={orderNumber}></OrderDetails>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientShape).isRequired
}

export default BurgerConstructor;