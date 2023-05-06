import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import HomePage from "../HomePage/HomePage";
import SignUp from "../SignUp/SignUp";

const LoadingSignUp = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (token === undefined || token === null) {
    return <SignUp />;
  }
  return (
    <div>
      <HomePage />
    </div>
  );
};
export default LoadingSignUp;
