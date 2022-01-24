import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { register } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../utils/hooks';
import styles from './registerPage.module.css'

function RegisterPage() {
  const [emailValue, setEmailValue] = React.useState('')
  const [firstName, setFirstNameValue] = React.useState('')
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

  const onFirstnameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFirstNameValue(e.target.value)
  }

  const handleRegister = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    dispatch(register({ email: emailValue, name: firstName, password: passwordValue }))
  }

  useEffect(() => {
    if (userState.registerSuccess) {
      userState.registerSuccess = false
      history.push('/')
    }
  }, [userState, history])

  if (userState.userName) {
    return <Redirect to="/" />
  }

  return (
    <>
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
          <Button type="primary" size='large' onClick={(e) => handleRegister(e)}>Зарегистрироваться</Button>
        </form>
        <div className={`${styles.linkContainer} text_type_main-small`}>
          <p className='text text_color_inactive'>Уже зарегистрированы?</p>
          <Link to="/login" className='text text_color_accent'>Войти</Link>
        </div>
      </div>
    </>

  );
}

export default RegisterPage;