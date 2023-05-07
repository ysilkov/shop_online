import React, { useState } from "react";
import style from "./Settings.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getSettingsDelivery, getSettingsProfile } from "../../store/api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { removeMessageAuth } from "../../store/auth";
import { persist } from "../../store/store";

const Settings = () => {
  const { email, fullName, id, phone, address, message } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const [emailInput, setEmailInput] = useState(email ?? "");
  const [fullNameInput, setFullNameInput] = useState(fullName);
  const [password, setPassword] = useState("");
  const [phoneInput, setPhoneInput] = useState(phone != null ? phone : "+380");
  const [addressInput, setAddressInput] = useState(
    address != null ? address : ""
  );
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [closeMessage, setCloseMessage] = useState(false);
  const [emailError, setEmailError] = useState(
    "Поштова адреса не може бути пустою"
  );
  const [passwordError, setPasswordError] = useState(
    "Пароль не може бути пустим"
  );
  const [profile, setProfile] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const sendProfile = () => {
    dispatch(
      getSettingsProfile({
        fullName: fullNameInput as string,
        email: emailInput as string,
        password: password,
        id: id as string,
      })
    );
  };
  const sendDelivery = () => {
    dispatch(
      getSettingsDelivery({
        phone: phoneInput as string,
        address: addressInput as string,
        id: id as string,
      })
    );
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setPasswordError("Пароль має бути від 3 до 20 символів");
      if (!e.target.value) {
        setPasswordError("Пароль не може бути пустим");
      }
    } else {
      setPasswordError("");
      setPassword(e.target.value);
    }
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Поштова адреса не коректна");
    } else {
      setEmailError("");
      setEmailInput(e.target.value);
      console.log(e.target.value);
    }
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log(e.target);
    switch (e.target.type) {
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
  const activeMessage = () => {
    dispatch(removeMessageAuth());
    if (!closeMessage) {
      setCloseMessage(true);
    }
  };
  return (
    <div className={style.settings_main}>
      <Header />
      <h3>Settings</h3>
      {message !== null && message !== undefined ? (
        <div className={closeMessage ? style.close : style.message_block}>
          <p>{message}</p>
          <button onClick={() => activeMessage()}>X</button>
        </div>
      ) : (
        <div className={style.close}></div>
      )}
      <p>Your can change settings:</p>
      <div className={style.settings_block}>
        <div className={style.settings_profile_form}>
          <section>
            <button onClick={() => setProfile(!profile)}>Profile data</button>
          </section>
          <form
            onSubmit={sendProfile}
            className={profile ? style.profile_active : style.profile_hidden}
          >
            <label>
              <p>Your first name and last name: </p>
              <input
                type="text"
                value={fullNameInput as string}
                onChange={(e) => setFullNameInput(e.target.value)}
                required
              />
            </label>
            <label>
              <p>Your email: </p>
              {emailError && emailDirty && (
                <div className={style.error_message}>{emailError}</div>
              )}
              <input
                type="email"
                name={emailInput as string}
                onChange={(e) => emailHandler(e)}
                onBlur={(e) => blurHandler(e)}
                required
              />
            </label>
            <label className={style.password}>
              <p>Change password:</p>
              {passwordError && passwordDirty && (
                <div className={style.error_message}>{passwordError}</div>
              )}
              <input
                className={style.input_password}
                type="password"
                name={password}
                onChange={(e) => passwordHandler(e)}
                onBlur={(e) => blurHandler(e)}
                required
              />
            </label>
            <label className={style.submit}>
              <input type="submit" value="Change settings" />
            </label>
          </form>
        </div>
        <div className={style.settings_delivery_form}>
          <section>
            <button onClick={() => setDelivery(!delivery)}>
              Delivery data
            </button>
          </section>
          <form
            onSubmit={sendDelivery}
            className={delivery ? style.delivery_active : style.delivery_hidden}
          >
            <label>
              <p>Your phone: </p>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                required
              />
            </label>
            <label>
              <p>Your address to delivery: </p>
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                required
              />
            </label>
            <label className={style.submit}>
              <input type="submit" value="Change settings" />
            </label>
          </form>
        </div>
      </div>
      <section>
        <Link to={"/"}>Go to back</Link>
      </section>
      <Footer />
    </div>
  );
};

export default Settings;
