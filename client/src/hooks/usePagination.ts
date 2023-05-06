import { useState } from "react";
import { getProducts } from "../store/api";
import { useAppDispatch } from "./hook";
interface UsePaginationProps {
   contentPerPage: number,
   count: number,
}
interface UsePaginationReturn {
   page: number;
   totalPages: number;
   firstContentIndex: number;
   lastContentIndex: number;
   nextPage: () => void;
   prevPage: () => void;
   setPage: (page: number) => void;
}
type UsePagination = (UsePaginationProps: UsePaginationProps) => (UsePaginationReturn);
const usePagination: UsePagination = ({ contentPerPage, count }) => {
   
  const [page, setPage] = useState(Number(JSON.parse(localStorage.getItem("page") as string)) || 1);
  localStorage.setItem("page", page.toString())
  const dispatch = useAppDispatch();
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage; 
  const changePage = (direction: boolean) => {
    
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        dispatch(getProducts({ items: (state + 1) * 9 })); 
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        dispatch(getProducts({ items: (state -1) * 9})); 

        return state - 1;
      }
    });
  };
  const setPageSAFE = (num: number) => {
    if (num > pageCount) {
      setPage(pageCount);
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };
  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};
export default usePagination;