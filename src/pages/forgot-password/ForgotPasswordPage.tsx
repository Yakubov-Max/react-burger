import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './forgotPasswordPage.module.css'

function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = React.useState('')

  const onEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmailValue(e.target.value)
  }

  return (
    <div className={`${styles.container}`}>
    <h2 className='text  text_type_main-medium'>Восстановление пароля</h2>
    <form action="" className={`${styles.formContainer} pb-20`}>
      <div className={`${styles.inputContainer} pt-6 pb-6`}>
        < EmailInput onChange={onEmailChange} value={emailValue} name={'E-mail'} />
      </div>
      <Button type="primary" size='large'>Восстановить</Button>
    </form>
    <div className={`${styles.linkContainer} pt-4 text_type_main-small`}>
      <p className='text text_color_inactive'>Вспомнили пароль?</p>
      <Link to="/login" className='text text_color_accent'>Войти</Link>
    </div>
  </div>
  );
}

export default ForgotPasswordPage;
