import { EmailInput, Input, } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../utils/hooks';
import styles from './profilePage.module.css'

function ProfilePage() {
  const [emailValue, setEmailValue] = React.useState('')
  const [firstName, setFirstNameValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)

  const onEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmailValue(e.target.value)
  }

  const onPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPasswordValue(e.target.value)
  }

  const onFirstnameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFirstNameValue(e.target.value)
  }

  useEffect(() => {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (accessToken) {
      dispatch(getUserData(accessToken))
      setEmailValue(userState.userEmail)
      setFirstNameValue(userState.userName)
    }
  }, [dispatch, userState.userEmail, userState.userName])

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.listContainer} pr-15`}>
        <ul className={`${styles.linkContainer}`}>
          <li><NavLink to={'/profile'} activeClassName='text_color_primary' className={`${styles.listItem} text text_type_main-medium text_color_inactive`}>Профиль</NavLink></li>
          <li><NavLink to={'/profile/orders'} activeClassName='text_color_primary' className={`${styles.listItem} text text_type_main-medium text_color_inactive`}>История заказов</NavLink></li>
          <li><NavLink to={'/login'} activeClassName='text_color_primary' className={`${styles.listItem} text text_type_main-medium text_color_inactive`}>Выход</NavLink></li>
        </ul>
        <p className='pt-20 text text_type_main-default text_color_inactive'> В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <form action="" className={`${styles.formContainer}`}>
        <div className={`${styles.inputContainer}`}>
          < Input icon='EditIcon' type='text' onChange={onFirstnameChange} placeholder='Имя' value={firstName} name={'firstname'} />
        </div>
        <div className={`${styles.inputContainer} pt-6`}>
          < EmailInput onChange={onEmailChange}  value={emailValue} name={'E-mail'} />
        </div>
        <div className={`${styles.inputContainer} pt-6 pb-6 `}>
          < Input icon='EditIcon' placeholder='Пароль' type='password' onChange={onPasswordChange} value={passwordValue} name={'password'} />
        </div>
      </form>
    </div>

  );
}

export default ProfilePage;
