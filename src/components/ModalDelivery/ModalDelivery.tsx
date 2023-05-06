import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getOrder } from "../../store/api";
import style from "./ModalDelivery.module.css";
import { removeAllOrder } from "../../store/cart";

interface ModalOrderWindowProps {
  deliveryModal: boolean;
  setDeliveryModal: Dispatch<SetStateAction<boolean>>;
}
const ModalDelivery = (props: ModalOrderWindowProps) => {
  const { order } = useAppSelector((state) => state.cart);
  const { email, fullName, phone, address, id } = useAppSelector((state) => state.auth) ?? {};
  const [emailInput, setEmailInput] = useState(email ?? "");
  const [fullNameInput, setFullNameInput] = useState(fullName);
  const [phoneInput, setPhoneInput] = useState(phone != null ? phone : "+380");
  const [addressInput, setAddressInput] = useState(address !=null ? address : "");
  const [novaPoshta, setNovaPoshta] = useState(false);
  const [ukrPoshta, setUkrPoshta] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNovaPoshtaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovaPoshta(e.target.checked);
    setDeliveryOption(e.target.name === "NovaPoshta" ? "NovaPoshta" : "");
    setUkrPoshta(false);
  };

  const handleUkrPoshtaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUkrPoshta(e.target.checked);
    setDeliveryOption(e.target.name === "Ukrposhta" ? "Ukrposhta" : "");
    setNovaPoshta(false);
  };
  const sendOrder = (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    if (!novaPoshta && !ukrPoshta) {
      setMessage("Choose delivery");
      setStatusMessage(true);
      return;
    }
    dispatch(
      getOrder({
        id: id as string,
        fullName: fullNameInput as string,
        email: emailInput as string,
        phone: phoneInput,
        address: addressInput,
        delivery: deliveryOption,
        timeCreate: new Date().toUTCString(),
        order: order,
      })
    );
    navigate("/success");
    dispatch(removeAllOrder());
    props.setDeliveryModal(false);
    setNovaPoshta(false);
    setUkrPoshta(false);
  };
  useEffect(() => {
    if (!props.deliveryModal) {
      setNovaPoshta(false);
      setUkrPoshta(false);
    }
  }, [props.deliveryModal]);

  return (
    <div
      className={props.deliveryModal ? style.modal_active : style.modal_hidden}
    >
      <div className={style.modal_block}>
        <h3>Please fill information for order:</h3>
        <div
          className={
            statusMessage ? style.modal_message : style.modal_message_hidden
          }
        >
          <p>{message}</p>
          <button onClick={() => setStatusMessage(!statusMessage)}>X</button>
        </div>
        <form onSubmit={sendOrder}>
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
            <input
              type="email"
              value={emailInput as string}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </label>
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
          <fieldset>
            <legend>Choose way for delivery:</legend>
            <div>
              <input
                type="checkbox"
                name="NovaPoshta"
                checked={novaPoshta}
                onChange={handleNovaPoshtaChange}
              />
              <label htmlFor="">NovaPoshta</label>
            </div>
            <div className="">
              <input
                type="checkbox"
                name="Ukrposhta"
                checked={ukrPoshta}
                onChange={handleUkrPoshtaChange}
              />
              <label>Ukrposhta</label>
            </div>
          </fieldset>
          <label className={style.submit}>
            <input type="submit"  value="Order" />
          </label>
        </form>
        <button
          className={style.modal_close}
          onClick={() => props.setDeliveryModal(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ModalDelivery;
