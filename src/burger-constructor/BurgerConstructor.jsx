import constructorStyles from "./BurgerConstructor.module.css"
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT, sendOrder, CLEAR_ORDER_MODAL, REMOVE_INGREDIENT, SORT_CONSTRUCTOR_LIST, CLEAR_CONSTRUCTOR_INGREDIENTS} from "../services/actions/burger";
import { useDrop, useDrag } from "react-dnd";
import { useState, useEffect, useCallback, useRef } from "react";
import update from "immutability-helper";
import { v4 as uuidv4 } from 'uuid';

const BurgerIngredient = ({ ingredient, index, moveIngredient }) => {
  const dispatch = useDispatch()
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "constructorIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.2 : 1;

  drag(drop(ref));

  function handleRemoveIngredient(index) {
    dispatch({
      type: REMOVE_INGREDIENT,
      index: index
    })
  }

  return (
    <li className={'ml-4'} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <ConstructorElement
        type={null}
        isLocked={false}
        handleClose={() => handleRemoveIngredient(index)}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price} />
    </li>
  )
}

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
    dispatch({
      type: CLEAR_CONSTRUCTOR_INGREDIENTS,

    })
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
        item: {
          ...ingredient.ingredient,
          uuid: uuidv4()
        }
      })
    } else if (ingredient.ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN,
        item: ingredient.ingredient,
      })
    }
  }

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const ingredient = constructorList[dragIndex];
      dispatch({
        type: SORT_CONSTRUCTOR_LIST,
        sortedIngredients: update(constructorList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, ingredient],
          ],
        }),
      });
    },
    [constructorList, dispatch]
  );

  return (
    <section ref={dropTarget} className={`pt-25  ${constructorStyles.container}`}>
      {bun &&
        <ConstructorElement
          type={'top'}
          isLocked={true}
          handleClose={undefined}
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
          price={bun.price} />
      }

      <ul className={`custom-scroll ${constructorStyles.list} pl-2 mt-4 mb-4 pr-1`}>
        {constructorList.map((item, index) => (
          <BurgerIngredient key={item.uuid} ingredient={item} index={index} moveIngredient={moveIngredient}></BurgerIngredient>
        ))}
      </ul>

      {bun &&
        <ConstructorElement
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