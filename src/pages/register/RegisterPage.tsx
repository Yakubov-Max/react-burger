import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './registerPage.module.css'

function RegisterPage() {
  const [emailValue, setEmailValue] = React.useState('')
  const [firstName, setFirstNameValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')

  const onEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmailValue(e.target.value)
  }

  const onPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPasswordValue(e.target.value)
  }

  const onFirstnameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFirstNameValue(e.target.value)
  }

  return (
    <div className={`${styles.container}`}>
      <h2 className='text  text_type_main-medium'>Регистрация</h2>
      <form action="" className={`${styles.formContainer} pb-20`}>
        <div className={`${styles.inputContainer} pt-6`}>
          < Input type='text' onChange={onFirstnameChange} value={firstName} placeholder='Имя' name={'firstname'} />
        </div>
        <div className={`${styles.inputContainer} pt-6`}>
          < EmailInput onChange={onEmailChange} value={emailValue} name={'E-mail'} />
        </div>
        <div className={`${styles.inputContainer} pt-6 pb-6 `}>
          <PasswordInput onChange={onPasswordChange} value={passwordValue} name={'password'} />
        </div>
        <Button type="primary" size='large'>Зарегистрироваться</Button>
      </form>
      <div className={`${styles.linkContainer} text_type_main-small`}>
        <p className='text text_color_inactive'>Уже зарегистрированы?</p>
        <Link to="/login" className='text text_color_accent'>Войти</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
