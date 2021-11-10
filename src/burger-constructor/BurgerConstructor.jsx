import React from "react"
import constructorStyles from "./BurgerConstructor.module.css"

import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"


function BurgerConstructor(props) {
  return (
    <section className={`pt-25  ${constructorStyles.container}`}>
      <ConstructorElement
        key={props.data[0]._id}
        type={'top'}
        isLocked={true}
        handleClose={undefined}
        text={`${props.data[0].name} (верх)`}
        thumbnail={props.data[0].image}
        price={props.data[0].price} />

      <ul className={`custom-scroll ${constructorStyles.list} pl-2 mt-4 mb-4 pr-1`}>
        {props.data.map((item, index) => (
          <li className={'ml-8'}>
          <ConstructorElement
            key={item._id}
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
        key={props.data[0]._id}
        type={'bottom'}
        isLocked={true}
        handleClose={undefined}
        text={`${props.data[0].name} (низ)`}
        thumbnail={props.data[0].image}
        price={props.data[0].price} />

        <div className="pt-10" style={{display: "flex", alignItems: "center", alignSelf: 'flex-end'}}>
          <div className="pr-10" style={{display: "flex", alignItems: "center"}}>
          <p className="text text_type_digits-medium text_color_primary" style={{paddingRight: 10}}>610</p>
          <CurrencyIcon className="pr-10" />
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>

    </section>
  )
}

export default BurgerConstructor;