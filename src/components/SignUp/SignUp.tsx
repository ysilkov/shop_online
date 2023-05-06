import React, { useState } from "react";
import style from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getAuth } from "../../store/api";

const SignUp = React.memo(() => {
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
  const state = useAppSelector((state) => state.auth);
  const history = useNavigate();
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
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,20}$/;
    if (!passwordRegex.test(String(e.target.value))) {
      setPasswordError(
        "Пароль має містити хоча б одну велику, малу літеру та цифру"
      );
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
  const createUser = (e: {
    preventDefault: () => void;
    currentTarget: { elements: { namedItem: (arg0: string) => any } };
  }) => {
    e.preventDefault();
    let fullName = e.currentTarget.elements.namedItem("fullName");
    let email = e.currentTarget.elements.namedItem("email");
    let password = e.currentTarget.elements.namedItem("password");
    dispatch(
      getAuth({
        fullName: fullName.value,
        email: email.value,
        password: password.value,
      })
    );
    fullName.value = "";
    email.value = "";
    password.value = "";
    if (closeMessage) {
      setCloseMessage(false);
    }
    history("/loadingsignup");
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
        <h1>Sign Up</h1>
        {state.message !== null && state.message !== undefined ? (
          <div className={closeMessage ? style.close : style.message_block}>
            <p>{state.message}</p>
            <button onClick={() => activeMessage()}>X</button>
          </div>
        ) : (
          <div className={style.close}></div>
        )}
        <form onSubmit={createUser}>
          <label className={style.full_name}>
            <p>Full Name:</p>
            <input
              className={style.input_full_name}
              type="fullName"
              name="fullName"
              required
            />
          </label>
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
              value="Sign Up"
            ></input>
          </label>
        </form>
        <div className={style.sign_in}>
          <Link to={"/sign-in"} onClick={() => changeMessage()}>
            Sign In
          </Link>
          <Link to={"/"} onClick={() => changeMessage()}>
            Go to website
          </Link>
        </div>
      </div>
    </div>
  );
});

export default SignUp;
