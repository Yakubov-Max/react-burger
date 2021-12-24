import constructorStyles from "./BurgerConstructor.module.css"
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modal/Modal";
import { useDispatch } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT, sendOrder, CLEAR_ORDER_MODAL, REMOVE_INGREDIENT } from "../services/actions/burger";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { useEffect } from "react";

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const constructorList = useSelector(state => state.burger.constructorList)
  const orderNumber = useSelector(state => state.burger.orderNumber)
  const bun = useSelector(state => state.burger.bun)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (bun) {
      const bunPrice = bun.price * 2
      setTotalPrice(constructorList.reduce((sum, ingredient) => sum + ingredient.price, bunPrice))
    }
  }, [constructorList, bun])

  const handleClose = () => {
    dispatch({
      type: CLEAR_ORDER_MODAL
    })
  }

  const handleOpen = () => {
    dispatch(sendOrder(constructorList.map(element => element._id)))
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dropHandler(ingredient)
    }
  })

  function dropHandler(ingredient) {
    if (ingredient.ingredient.type !== 'bun') {
      dispatch({
        type: ADD_INGREDIENT,
        item: ingredient.ingredient
      })
    } else if (ingredient.ingredient.type === 'bun' && !bun) {
      dispatch({
        type: ADD_BUN,
        item: ingredient.ingredient
      })
    }

  }

  return (
    <section ref={dropTarget} className={`pt-25  ${constructorStyles.container}`}>
      {bun &&
        <ConstructorElement
          key={"top"}
          type={'top'}
          isLocked={true}
          handleClose={undefined}
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
          price={bun.price} />
      }

      <ul className={`custom-scroll ${constructorStyles.list} pl-2 mt-4 mb-4 pr-1`}>
        {constructorList.map((item, index) => (
          <li key={index} className={'ml-4'}>
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

      {bun &&
        <ConstructorElement
          key={"bottom"}
          type={'bottom'}
          isLocked={true}
          handleClose={undefined}
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
          price={bun.price} />
      }
      {constructorList && bun &&
        <div className={`pt-10 ${constructorStyles.flexContainer} ${constructorStyles.checkoutContainer}`}>
          <div className={`pr-10 ${constructorStyles.flexContainer}`}>
            <p className="pr-2 text text_type_digits-medium text_color_primary">{totalPrice}</p>
            <CurrencyIcon className="pr-10" />
          </div>
          <Button type="primary" onClick={handleOpen} size="medium">
            Оформить заказ
          </Button>
        </div>
      }

      {orderNumber && (
        <Modal handleClose={handleClose}>
          <OrderDetails></OrderDetails>
        </Modal>
      )
      }
    </section>
  )
}

export default BurgerConstructor;