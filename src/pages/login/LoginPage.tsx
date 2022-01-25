import React, { useEffect } from 'react';
import styles from './loginPage.module.css'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../utils/hooks';

function LoginPage() {
  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const userState = useSelector(state => state.user)

  const onEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmailValue(e.target.value)
  }

  const onPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPasswordValue(e.target.value)
  }

  const handleLogin = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    dispatch(login({ email: emailValue, password: passwordValue }))
  }

  useEffect(() => {
    if (userState.loginSuccess) {
      userState.loginSuccess = false
      history.push('/')
    }
  }, [userState, history])

  if (userState.userName) {
    return <Redirect to="/" />
  }

  return (
    <div className={`${styles.container}`}>
      <h2 className='text  text_type_main-medium'>Вход</h2>
      <form action="" className={`${styles.formContainer} pb-20`}>
        <div className={`${styles.inputContainer} pt-6`}>
          < EmailInput onChange={onEmailChange} value={emailValue} name={'E-mail'} />
        </div>
        <div className={`${styles.inputContainer} pt-6 pb-6 `}>
          <PasswordInput onChange={onPasswordChange} value={passwordValue} name={'password'} />
        </div>
        <Button type="primary" size='large' onClick={(e) => handleLogin(e)}>Войти</Button>
      </form>
      <div className={`${styles.linkContainer} text_type_main-small`}>
        <p className='text text_color_inactive'>Вы — новый пользователь?</p>
        <Link to="/register" className='text text_color_accent'>Зарегистрироваться</Link>
      </div>
      <div className={`${styles.linkContainer} pt-4 text_type_main-small`}>
        <p className='text text_color_inactive'>Забыли пароль?</p>
        <Link to="/forgot-password" className='text text_color_accent'>Восстановить пароль</Link>
      </div>
    </div>
  );
}

export default LoginPage;
