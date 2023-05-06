import React from "react";
import style from "./SuccessOrder.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Loading from "../Loading/LoadingPage/Loading";
import Contacts from "../Contact/Contacts";
import { useNavigate } from "react-router-dom";
import { removeMessage } from "../../store/cart";

const SuccessOrder = () => {
  const { message } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goToHome = () => {
    dispatch(removeMessage());
    navigate("/");
  };
  return (
    <div className={style.modal_active}>
      <div className={style.modal_block}>
        <h3>Your order is successful</h3>
        <p>{message}</p>
        <div>
          <p>If your have questions, you can ask for information:</p>
          <Contacts />
        </div>
        <p>Thank you for the order! </p>
        <button className={style.modal_close} onClick={() => goToHome()}>
          Go to homepage
        </button>
      </div>
      : <Loading />
    </div>
  );
};

export default SuccessOrder;
