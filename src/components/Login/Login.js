import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  
  const [emailState, setEmailState] = useState({value:'', isValid:null});
  const [passwordState, setPasswordState] = useState({value:'', isValid:null});
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const validation = setTimeout(() => {
      setFormIsValid(() => {
        return emailState.isValid && passwordState.isValid;
      });
    }, 500);

    return () => {
      clearTimeout(validation);
    };
  }, [emailState, passwordState]);

  
  const emailChangeHandler = (event) => {
    const str = event.target.value;
    setEmailState({value:str, isValid:str.includes('@')})
  };
  
  const passwordChangeHandler = (event) => {
    const str = event.target.value;
    setPasswordState({value:str, isValid:str.trim().length>6});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="false"
            value={passwordState.value}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>

      <p>{JSON.stringify(emailState)}</p>
      <p>{JSON.stringify(passwordState)}</p> 
    </Card>
  );
};

export default Login;
