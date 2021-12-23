import constructorStyles from "./BurgerConstructor.module.css"
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modal/Modal";
import { useDispatch } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT, sendOrder, CLEAR_ORDER_MODAL } from "../services/actions/burger";
import { useSelector } from "react-redux";

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.burger.ingredients)
  const constructorList = useSelector(state => state.burger.constructorList)
  const orderNumber = useSelector(state => state.burger.orderNumber)
  const bun = useSelector(state => state.burger.bun)

  // const bunPrice = bun.price * 2
  // const totalPrice = useMemo(() => constructorList.reduce((sum, ingredient) => sum + ingredient.price, bunPrice), [constructorList])

  const handleClose = () => {
    dispatch({
      type: CLEAR_ORDER_MODAL
    })
  }

  const handleOpen = () => {
    dispatch(sendOrder(constructorList.map(element => element._id)))
  }

  return (
    <section className={`pt-25  ${constructorStyles.container}`}>
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
        {constructorList.map((item) => (
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
            {/* <p className="pr-2 text text_type_digits-medium text_color_primary">{totalPrice}</p> */}
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