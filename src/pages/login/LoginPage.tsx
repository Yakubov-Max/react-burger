import React from 'react';
import styles from './loginPage.module.css'
import { Link } from 'react-router-dom'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function LoginPage() {
  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')

  const onEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmailValue(e.target.value)
  }

  const onPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPasswordValue(e.target.value)
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
        <Button type="primary" size='large'>Войти</Button>
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
