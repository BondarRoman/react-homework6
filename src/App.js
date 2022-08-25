
import './App.scss';
import styles from './components/Cssmodules.module.scss';
import React, { Component, useEffect, useState } from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Емейл не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  const onBlurHandler = (e) =>{
    switch(e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;

        case 'password':
        setPasswordDirty(true);
        break;
    };
  };

  const emailHandler = (e) =>{
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())){
      setEmailError('Некорректный емейл');
    }else{
      setEmailError('');
    };
  };

  const passwordHandler = (e) =>{
    setPassword(e.target.value);
    if(e.target.value.length < 5 || e.target.value.length > 12){
      setPasswordError('Пароль должен быть длиннее 4 и меньше 12');
      if(!e.target.value){
        setPasswordError('Пароль не может быть пустым')
      };
    } else{
      setPasswordError('')
    };
  };


  useEffect(()=>{
    if(emailError || passwordError){
      setFormValid(false);
    } else{
      setFormValid(true);
    };
  }, [emailError, passwordError]);

  return (
    <div className="App">
          <header className="App-header">
            <form >
                  <h1 className={styles.test}>Регистрация</h1>
                  {(emailDirty && emailError) && <div className={styles.red}>{emailError}</div>}
                  <input value={email} onChange={(e)=>emailHandler(e)} onBlur={(e) => onBlurHandler(e)} name='email' type="text" placeholder='Введите свой email'/>
                  {(passwordDirty && passwordError) && <div className={styles.red}>{passwordError}</div>}
                  <input value={password} onChange={(e)=>passwordHandler(e)} onBlur={(e) => onBlurHandler(e)}  name='password' type="password" placeholder='Введите свой пароль'/>
                  <button className={styles.submit} disabled={!formValid} type='submit'>Регистрация</button>
            </form>
          </header>
        </div>
  );
};

export default App;

