import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { resetPassword } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../utils/hooks';
import styles from './forgotPasswordPage.module.css'

function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = React.useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const userState = useSelector(state => state.user)

  const onEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmailValue(e.target.value)
  }

  const handlePasswordReset = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    dispatch(resetPassword({email: emailValue}))
    
  }

  useEffect(() => {
     if (userState.resetPasswordSuccess) {
      userState.resetPasswordSuccess = false
      history.push('/reset-password')
     }
  }, [history, userState])

  return (
    <div className={`${styles.container}`}>
    <h2 className='text  text_type_main-medium'>Восстановление пароля</h2>
    <form action="" className={`${styles.formContainer} pb-20`}>
      <div className={`${styles.inputContainer} pt-6 pb-6`}>
        < EmailInput onChange={onEmailChange} value={emailValue} name={'E-mail'} />
      </div>
      <Button type="primary" size='large' onClick={(e) => handlePasswordReset(e)}>Восстановить</Button>
    </form>
    <div className={`${styles.linkContainer} pt-4 text_type_main-small`}>
      <p className='text text_color_inactive'>Вспомнили пароль?</p>
      <Link to="/login" className='text text_color_accent'>Войти</Link>
    </div>
  </div>
  );
}

export default ForgotPasswordPage;
