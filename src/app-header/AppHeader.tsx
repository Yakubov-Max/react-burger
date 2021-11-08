import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from "./AppHeader.module.css"


function AppHeader() {
  return (
    <header>
      <nav className={headerStyles.container}>
        <div style={{ display: "flex" }}>
          <a className={`pt-4 pb-4 pl-5 pr-5 ml-2 ${headerStyles.itemContainer}`} href="#">
            <BurgerIcon type="primary" />
            <p className={`text text_type_main-default text_color_primary pl-2 ${headerStyles.itemText}`}>Конструктор</p>
          </a>
          <a className={` pt-4 pb-4 pl-5 pr-5 ml-2 ${headerStyles.itemContainer}`} href="#">
            <ProfileIcon type="primary" />
            <p className={`text text_type_main-default text_color_primary pl-2 `}>Лента заказов</p>
          </a>
        </div>
        <Logo />
        <a className={`pt-4 pb-4 pl-5 pr-5 ml-2 ${headerStyles.itemContainer}`} href="#">
          <ListIcon type="primary" />
          <p className={`text text_type_main-default text_color_primary pl-2 ${headerStyles.itemText}`}>Лента заказов</p>
        </a>
      </nav>
    </header>
  )
}

export default AppHeader