import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from "./AppHeader.module.css"
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from "../utils/hooks";


function AppHeader() {
  const userState = useSelector(state => state.user)

  return (
    <header className={headerStyles.headerContainer}>
      <nav className={headerStyles.container}>
        <div className={headerStyles.flex}>
          <NavLink className={`text text_type_main-default text_color_inactive pl-2 ${headerStyles.itemText}`} exact={true} activeClassName="text_color_primary" to="/">
            <BurgerIcon type="primary" />
            <p>Конструктор </p>
          </NavLink>
          <NavLink className={`text text_type_main-default text_color_inactive pl-2 ${headerStyles.itemText}`} exact={true} activeClassName="text_color_primary" to="/orders">
            <ListIcon type="secondary" />
            <p>Лента заказов</p>
          </NavLink>
        </div>
        <Link to={'/'}>
          <Logo />
        </Link>
        <NavLink to={userState.userName ? "/profile" : "/login"} className={`text text_type_main-default text_color_inactive pl-2 ${headerStyles.itemText}`} exact={true} activeClassName="text_color_primary" >
          <ProfileIcon type="secondary" />
          <p >Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader