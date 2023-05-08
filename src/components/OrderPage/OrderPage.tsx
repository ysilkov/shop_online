import React, { useEffect } from "react";
import style from "./OrderPage.module.css";
import {  useAppDispatch, useAppSelector } from "../../hooks/hook";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../store/api";


const OrderPage = () => {
  const { id } = useAppSelector((state) => state.auth);
  const { allOrders, message } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch()
  const dataCreteOrder = (timeCreate: string) => {
  const date = new Date(Date.parse(timeCreate));
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: "Europe/Kiev", 
    hour12: false, 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  return formatter.format(date);
};
useEffect(()=>{
  dispatch(getAllOrders({id: id as string}))
}, [dispatch, id])
  return (
    <div className={style.order_main}>
      <Header />
      {allOrders.length < 1 ? (
        <div className={style.order_main_message}>
          <h3>{message}</h3>
        </div>
      ) : (
        <div className={style.order_block}>
          <h3>Your order list</h3>
          {allOrders.map((el, index) => (
            <div className={style.order_container} key={el._id}>
              <hr />
              <div className={style.order_items}>
                <p>Your id number order: {el._id}</p>
                <p>Time order: {dataCreteOrder(el.timeCreate)}</p>
                <table className={style.cart_table}>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Image</th>
                      <th>Brand</th>
                      <th>Title</th>
                      <th>Count</th>
                      <th>Price</th>
                      <th>Total price</th>
                    </tr>
                  </thead>
                  {el.order.map((item, index) => (
                    <tbody key={index}>
                      <tr className={style.cart_row}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={item.thumbnail} alt="Item Logo" />
                        </td>
                        <td>{item.brand}</td>
                        <td>{item.title}</td>
                        <td>{item.count}</td>
                        <td>{item.price} $</td>
                        <td>
                          <strong>{item.price * item.count} $</strong>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                  <tfoot>
                    <tr>
                      <td colSpan={6}></td>
                      <td>
                        Total price order:{" "}
                        <strong>
                          {el.order.reduce(
                            (
                              acc: number,
                              item: { price: number; count: number },
                              index: number
                            ) => acc + item.price * item.count,
                            0
                          )}{" "}
                          $
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to={"/"}>Go Back</Link>
      <Footer />
    </div>
  );
};

export default OrderPage;
