import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
const HomePage = React.lazy(() => import("./pages/Home/HomePage"));


import Layout from "./layout/Layout";
import Loading from "./components/Loading/Loading";

import YogaChatHome from "./components/ExamHub/Register";
import Exam from "./components/ExamHub/Exam";
import Result from "./components/ExamHub/Result";
import Login from "./components/ExamHub/Login";




export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<YogaChatHome />} />
          <Route path="/exam" element={<Exam/>} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
          
          
          <Route
            path="/home"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
