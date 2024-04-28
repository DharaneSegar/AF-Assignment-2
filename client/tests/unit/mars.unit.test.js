/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Mars from "../../src/components/mars";

jest.mock("../../src/components/Header", () => {
  return () => <div>Mocked Header</div>;
});

test("renders APOD component", () => {
  render(<Mars />);
  const titleElement = screen.getByText("Mars Rover Photos");
  expect(titleElement).toBeTruthy();
});
