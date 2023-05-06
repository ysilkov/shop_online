import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import HomePage from "../HomePage/HomePage";
import SignIn from "../SignIn/SignIn";

const LoadingSignIn = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (token === undefined || token === null) {
    return <SignIn />;
  }
  return (
    <div>
      <HomePage />
    </div>
  );
};
export default LoadingSignIn;
