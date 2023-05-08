import React from "react";
import style from "./Product.module.css";
import { ReactComponent as Star } from "../../image/star.svg";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useAppSelector } from "../../hooks/hook";
import Contacts from "../Contact/Contacts";
import "../../carousel.css";

const Product = React.memo(() => {
  const product = useAppSelector((state) => state.products.product);
  return (
    <div>
      <Header />
      <>
        {product.map((el) => (
          <div className={style.product_block} key={el.id}>
            <div className={style.product_container_image}>
              <Carousel>
                {product[0].images.map((logo, i) => (
                  <div className={style.product_image} key={`logo-${i}`}>
                    <img src={logo} alt="Logo item" />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className={style.product_container_information}>
              <section>
                <p className={style.product_information}>
                  <strong>Price: </strong>
                  <strong>{el.price} $</strong>
                </p>
                <p className={style.product_information}>
                  <strong>Brand:</strong> {el.brand}
                </p>
                <p className={style.product_information}>
                  <strong>Product:</strong> {el.title}
                </p>
              </section>
              <div
                className={style.ratingStars}
                data-title={`Rating: ${el.rating} stars`}
              >
                <section>
                  {[...Array(Math.floor(Number(el.rating)))].map((_, i) => (
                    <Star
                      key={`full-${i}`}
                      className={`${style.c_icon} ${style.full}`}
                    />
                  ))}
                  {[
                    ...Array(
                      5 - Number(el.rating) > 0 && 5 - Number(el.rating) < 1
                        ? 1
                        : 0
                    ),
                  ].map((_, i) => (
                    <svg
                      viewBox="0 0 32 32"
                      className={style.halfPath}
                      key={`half-${i}`}
                    >
                      <defs>
                        <linearGradient
                          id="half"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset={`${
                              +Number(el.rating).toFixed(0) * 10 + "%"
                            }`}
                            stopColor="black"
                          />
                          <stop
                            offset={`${
                              100 - +Number(el.rating).toFixed(0) * 10 + "%"
                            }`}
                            stopColor="#c4c2bf"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z"
                        fill="url(#half)"
                      />
                    </svg>
                  ))}
                  {[
                    ...Array(
                      5 - Number(el.rating) >= 1
                        ? 5 - Math.floor(Number(el.rating))
                        : 0
                    ),
                  ].map((_, i) => (
                    <Star
                      key={`empty-${i}`}
                      className={`${style.c_icon} ${style.inactive}`}
                    />
                  ))}
                </section>
                <section>
                  <p>{el.rating}</p>
                </section>
              </div>
              <p className={style.product_information}>
                <strong>Description:</strong> {el.description}
              </p>
              <section className={style.product_button}>
                <button>Buy Now</button>
              </section>
              <section className={style.product_link}>
                <Link to={"/"}>
                  {" "}
                  <p>&#8592;</p> <p>Go Back</p>
                </Link>
              </section>
            </div>
          </div>
        ))}
      </>
      <>
        <Contacts />
        <Footer />
      </>
    </div>
  );
});

export default Product;
