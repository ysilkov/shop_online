import style from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png";
import home from "../../image/home.png";
import cart from "../../image/basket.png";
import setting from "../../image/setting.png";
import { removeUser } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { persist } from "../../store/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.cart);
  const {email, token} = useAppSelector((state)=>state.auth)
  const logOut = () => {
    dispatch(removeUser());
    persist.purge();
  };
  return (
    <div className={style.header}>
      <div className={style.header_home}>
        <Link to={"/"} className={style.home}>
          <img src={home} alt="Home" className={style.header_logo_home} />
        </Link>
      </div>
      <span className={style.header_menu}>
        <div className={style.header_logo_block}>
          <img src={logo} alt="Logo" className={style.header_logo_logo} />
          <p className={style.header_username}>{email}</p>
        </div>
        <div className={style.header_block_cart}>
          <Link to={"/cart"}>
            <img src={cart} alt="Cart" className={style.header_logo_cart} />
            <p
              className={
                order.length >= 1
                  ? style.header_logo_cart_items_filled
                  : style.header_logo_cart_items_empty
              }
            >
              {order.length}
            </p>
          </Link>
        </div>
        {token === null ? (
          <div className={style.button_menu_down}>
            <img className={style.button_menu} src={setting} alt="Setting" />
            <div className={style.button_menu_content}>
              <Link to={"/sign-in"} className={style.home}>
                Sign In
              </Link>
              <Link to={"/sign-up"} className={style.home}>
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div className={style.button_menu_down}>
            <img className={style.button_menu} src={setting} alt="Setting" />
            <div className={style.button_menu_content}>
              <Link to={"/settings"} className={style.home}>
                Settings
              </Link>
              <Link to={"/order"} className={style.home}>
                Your order
              </Link>
              <Link to={"/sign-in"} onClick={() => logOut()}>
                Log Out
              </Link>
            </div>
          </div>
        )}
      </span>
    </div>
  );
};

export default Header;
