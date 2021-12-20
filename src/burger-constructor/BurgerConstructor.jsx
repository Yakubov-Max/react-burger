import { useContext, useEffect, useState } from "react"
import constructorStyles from "./BurgerConstructor.module.css"
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from '../order-details/OrderDetails';
import { ingredientContext } from "../services/ingredientContext";

const BurgerConstructor = () => {
  const ingredients = useContext(ingredientContext)

  const [modalOpen, setModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)

  const bun = ingredients[0]
  const bunPrice = bun.price * 2

  useEffect(() => {
    setTotalPrice(ingredients.reduce((sum, ingredient) => sum + ingredient.price, bunPrice))
  }, [ingredients, bunPrice])

  const mainIngridients = ingredients.filter((item) => item.type !== "bun")

  const ingredientsId = []
  ingredients.forEach(element => {
    ingredientsId.push(element._id)
  });

  const handleClose = () => {
    setModal(false)
  }

  const handleOpen = () => {
    sendOrder(ingredientsId)
    setModal(true)
  }


  const sendOrder = async (ingredientsId) => {
    try {
      const res = await fetch(`https://norma.nomoreparties.space/api/orders`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: ingredientsId })
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

export default BurgerConstructor;