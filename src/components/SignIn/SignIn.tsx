import React, { useState } from "react";
import style from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getLogin } from "../../store/api";

const SignIn = () => {
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [closeMessage, setCloseMessage] = useState(false);
  const [emailError, setEmailError] = useState(
    "Поштова адреса не може бути пустою"
  );
  const [passwordError, setPasswordError] = useState(
    "Пароль не може бути пустим"
  );
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const state = useAppSelector((state) => state.auth);
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Поштова адреса не коректна");
    } else {
      setEmailError("");
    }
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setPasswordError("Пароль має бути від 3 до 20 символів");
      if (!e.target.value) {
        setPasswordError("Пароль не може бути пустим");
      }
    } else {
      setPasswordError("");
    }
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };
  const loginUser = (e: {
    preventDefault: () => void;
    currentTarget: { elements: { namedItem: (arg0: string) => any } };
  }) => {
    e.preventDefault();
    let email = e.currentTarget.elements.namedItem("email");
    let password = e.currentTarget.elements.namedItem("password");
    dispatch(getLogin({ email: email.value, password: password.value }));
    email.value = "";
    password.value = "";
    if (closeMessage) {
      setCloseMessage(false);
    }
    history("/loadingsignin");
  };
  const activeMessage = () => {
    dispatch(removeUser());
    if (!closeMessage) {
      setCloseMessage(true);
    }
  };
  const changeMessage = () => {
    dispatch(removeUser());
  };
  return (
    <div className={style.main}>
      <div className={style.main_container}>
        <h1>Sign In</h1>
        {state.message !== null && state.message !== undefined ? (
          <div className={closeMessage ? style.close : style.message_block}>
            <p>{state.message}</p>
            <button onClick={() => activeMessage()}>X</button>
          </div>
        ) : (
          <div className={style.close}></div>
        )}
        <form onSubmit={loginUser}>
          <label className={style.username}>
            <p>email:</p>
            {emailDirty && emailError && (
              <div className={style.error_message}>{emailError}</div>
            )}
            <input
              className={style.input_email}
              type="email"
              name="email"
              onChange={(e) => emailHandler(e)}
              onBlur={(e) => blurHandler(e)}
              required
            />
          </label>
          <label className={style.password}>
            <p>password:</p>
            {passwordDirty && passwordError && (
              <div className={style.error_message}>{passwordError}</div>
            )}
            <input
              className={style.input_password}
              type="password"
              name="password"
              onChange={(e) => passwordHandler(e)}
              onBlur={(e) => blurHandler(e)}
              required
            />
          </label>
          <label className={style.submit}>
            <input
              type="submit"
              className={style.button}
              value="Sign In"
            ></input>
          </label>
        </form>
        <div className={style.sign_up}>
          <Link to={"/sign-up"} onClick={() => changeMessage()}>
            Sign Up
          </Link>
          <Link to={"/"} onClick={() => changeMessage()}>
            Go to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
