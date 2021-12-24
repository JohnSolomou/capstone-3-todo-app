import { render, screen, cleanup } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";

import HomePage from "../../pages/Home";
test("should render Header component", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
});

test("should render Footer component", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
});

test("should render HomePage component", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
});
