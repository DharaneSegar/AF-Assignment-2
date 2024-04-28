/* eslint-disable react/display-name */
/* eslint-disable no-undef */
// apod.unit.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import APOD from "../../src/components/apod";

// Mocking the Header component to avoid useLocation error
jest.mock("../../src/components/header", () => {
  return () => <div>Mocked Header</div>;
});

test("renders APOD component", () => {
  render(<APOD />);
  const titleElement = screen.getByText("APOD - Astronomy Picture of the Day");
  expect(titleElement).toBeTruthy();
});
