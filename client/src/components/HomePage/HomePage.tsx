import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import usePagination from "../../hooks/usePagination";
import {
  getAllProducts,
  getBrandCategoryProducts,
  getBrandProducts,
  getCategoryProducts,
  getProducts,
} from "../../store/api";
import { clearProducts } from "../../store/products";
import Contacts from "../Contact/Contacts";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loading from "../Loading/LoadingPage/Loading";
import Products from "../Products/Products";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [selectedBrand, setBrand] = useState<string | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
  const dispatch = useAppDispatch();
  const { fullName} = useAppSelector((state) => state.auth);
  const { products, allProducts } = useAppSelector((state) => state.products);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 9,
    count: allProducts.length,
  });
  useEffect(() => {
    if (selectedBrand === "all" && selectedCategory === "all") {
      dispatch(getProducts({ items: lastContentIndex }));
      dispatch(getAllProducts());
    } else if (selectedBrand !== "all" && selectedCategory === "all") {
      dispatch(clearProducts());
      dispatch(
        getBrandProducts({ brand: selectedBrand, page: lastContentIndex })
      );
    } else if (selectedBrand === "all" && selectedCategory !== "all") {
      dispatch(clearProducts());
      dispatch(
        getCategoryProducts({
          page: lastContentIndex,
          category: selectedCategory,
        })
      );
    } else {
      dispatch(
        getBrandCategoryProducts({
          page: lastContentIndex,
          brand: selectedBrand,
          category: selectedCategory,
        })
      );
    }
  }, [dispatch, lastContentIndex, selectedBrand, selectedCategory]);

  const sortByBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setBrand(e.target.value);
  };
  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <div className={style.main}>
        <Header />
        {products.length > 0 ? (
          <>
            <h1>Welcome {fullName}</h1>
            <div className={style.main_filter}>
              <form>
                <label className={style.main_filter_label}>
                  <span>Search by brand</span>
                  <select
                    onChange={(e) => sortByBrand(e)}
                    value={selectedBrand}
                  >
                    <option value="all">All</option>
                    {[
                      ...new Set(
                        allProducts.map((el: { brand: string }) => el.brand)
                      ),
                    ].map((el) => (
                      <option value={el} key={`option-${el}`}>
                        {el}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={style.main_filter_label}>
                  <span>Sort by category</span>
                  <select
                    onChange={(e) => selectCategory(e)}
                    value={selectedCategory}
                  >
                    <option value="all">All</option>
                    {[
                      ...new Set(
                        allProducts.map(
                          (el: { category: string }) => el.category
                        )
                      ),
                    ].map((el) => (
                      <option value={el} key={`option-${el}`}>
                        {el}
                      </option>
                    ))}
                  </select>
                </label>
              </form>
            </div>
            <Products
              lastContentIndex={lastContentIndex}
              firstContentIndex={firstContentIndex}
            />
            <div className={style.main_pagination}>
              <button onClick={prevPage} className={style.main_pagination_page}>
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  onClick={() => setPage(index + 1)}
                  key={index}
                  className={
                    page === index + 1
                      ? style.main_pagination_button_active
                      : style.main_pagination_page
                  }
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={nextPage} className={style.main_pagination_page}>
                &gt;
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Contacts />
      <Footer />
    </>
  );
};

export default HomePage;
