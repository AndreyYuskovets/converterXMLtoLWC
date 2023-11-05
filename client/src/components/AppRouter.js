import React from "react";
import { Route, Routes } from "react-router-dom";
import { CONVERT_ROUTE } from "../utils/consts";
import Converter from '../pages/Converter';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={CONVERT_ROUTE} element={<Converter />} exact></Route>
    </Routes>
  );
};

export default AppRouter;
