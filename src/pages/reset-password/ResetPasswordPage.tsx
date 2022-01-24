import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { resetPasswordCode } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../utils/hooks';
import styles from './resetPasswordPage.module.css'

function ResetPasswordPage() {
  const [code, setCodeValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const userState = useSelector(state => state.user)

  const onPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPasswordValue(e.target.value)
  }

  const onCodeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCodeValue(e.target.value)
  }

  const handleSendToken = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    dispatch(resetPasswordCode({code: code, password: passwordValue}))
  }

  useEffect(() => {
    if (userState.resetPasswordCodeSuccess) {
      userState.resetPasswordCodeSuccess = false
      history.push('/')
    }
  }, [userState, history])

  return (
    <div className={`${styles.container}`}>
      <h2 className='text  text_type_main-medium'>Восстановление пароля</h2>
      <form action="" className={`${styles.formContainer} pb-20`}>
        <div className={`${styles.inputContainer} pt-6 `}>
          <PasswordInput onChange={onPasswordChange} value={passwordValue} name={'password'} />
        </div>
        <div className={`${styles.inputContainer} pt-6 pb-6`}>
          < Input type='text' onChange={onCodeChange} value={code} placeholder='Введите код из письма' name={'firstname'} />
        </div>
        <Button type="primary" size='large' onClick={(e) => handleSendToken(e)}>Сохранить</Button>
      </form>
      <div className={`${styles.linkContainer} pt-4 text_type_main-small`}>
        <p className='text text_color_inactive'>Вспомнили пароль?</p>
        <Link to="/login" className='text text_color_accent'>Войти</Link>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
