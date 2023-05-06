import React, { useState } from "react";
import style from "./Products.module.css";
import { ReactComponent as Star } from "../../image/star.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Link } from "react-router-dom";
import { findProduct } from "../../store/products";
import ModalAddToCart from "../ModalAddToCart/ModalAddToCart";

interface ProductsProps {
  firstContentIndex: number;
  lastContentIndex: number;
}

const Products = React.memo((props: ProductsProps) => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const getProduct = (id: string) => {
    dispatch(findProduct(id));
  };
  const [modalActive, setModalActive] = useState(false);
  const addToCart = (id: string) => {
    setModalActive(true);
    dispatch(findProduct(id));
  };
  return (
    <div className={style.products_block}>
      {products
        .slice(props.firstContentIndex, props.lastContentIndex)
        .map((product) => (
          <div
            className={style.product_container}
            key={`product-${product.id}`}
          >
            <img src={product.thumbnail} alt={product.title} />
            <section>
              <p>
                Price: <strong>{`${product.price} $`}</strong>
              </p>
              <p className={style.product_title}>{product.title}</p>
              <p className={style.product_rating}>
                Rating: {<Star />} {product.rating}
              </p>
              <p className={style.product_description}>{product.description}</p>
            </section>
            <section className={style.product_button}>
              <Link
                to={`/product/:${product.id}`}
                onClick={() => getProduct(product.id)}
              >
                Show More
              </Link>
              <button onClick={() => addToCart(product.id)}>Add to cart</button>
            </section>
          </div>
        ))}
      <ModalAddToCart active={modalActive} setActive={setModalActive} />
    </div>
  );
});

export default Products;
