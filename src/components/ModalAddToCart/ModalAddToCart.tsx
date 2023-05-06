import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { orderProduct, orderProducts } from "../../store/cart";
import style from "./ModalAddToCart.module.css";

interface ModalAddToCartProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}
const ModalAddToCart = (props: ModalAddToCartProps) => {
  const { product, products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const addProductToCart = (id: string) => {
    dispatch(orderProducts(products));
    dispatch(orderProduct({ id: id, count: count }));
    setCount(1);
    props.setActive(false);
  };
  return (
    <div className={props.active ? style.modal : style.hidden}>
      <div className={style.modal_block}>
        {product.map((el) => (
          <div key={el.id} className={style.modal_container}>
            <img
              src={el.thumbnail}
              alt="Product Title"
              className={style.modal_image}
            />
            <p>
              <strong>Price: {el.price} $</strong>
            </p>
            <p>
              <strong>Brand:</strong> {el.brand}
            </p>
            <p>
              <strong>Model:</strong> {el.title}
            </p>
            <div className={style.modal_container_input}>
              <button onClick={() => setCount(count <= 1 ? 1 : count - 1)}>
                -
              </button>
              <input
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
              <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <Link to={"/"} onClick={() => addProductToCart(el.id)}>
              Continue
            </Link>
            <button
              className={style.modal_close}
              onClick={() => props.setActive(false)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalAddToCart;
